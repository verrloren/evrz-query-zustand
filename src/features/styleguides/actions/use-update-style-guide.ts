import { useMutation, useQueryClient } from "@tanstack/react-query";

import { StyleGuide } from "@/entities/styleguide";
import { styleGuidesApi, editStyleGuideAction } from "@/features/styleguides";

type UpdateStyleGuideVariables = {
	guideline_id: number;
	name: string;
}

export const useUpdateStyleGuide = () => {

	const queryClient = useQueryClient();
	const updateStyleGuideMutation = useMutation({
		mutationFn: ({ guideline_id, name }: UpdateStyleGuideVariables) => editStyleGuideAction(guideline_id, name),

    onMutate: async ({ guideline_id, name }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [styleGuidesApi.baseKey],
      });

      const previousStyleGuides = queryClient.getQueryData<StyleGuide[]>([styleGuidesApi.baseKey]);

      // Optimistically update styleguide list
      if (previousStyleGuides) {
        const updatedStyleGuides = previousStyleGuides.map(styleguide => 
          styleguide.guideline_id === guideline_id ? { ...styleguide, name } : styleguide
        );
        queryClient.setQueryData([styleGuidesApi.baseKey], updatedStyleGuides);
      }

      // Update local state

      return { previousStyleGuides };
    },
		onError: (_, __, context) => {
			// Roll back to the previous value
				if (context?.previousStyleGuides) {
					queryClient.setQueryData([styleGuidesApi.baseKey], context.previousStyleGuides)
				}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [styleGuidesApi.baseKey] })
		}
	});

	const updateStyleGuide = (guideline_id: number, name: string) => {
		updateStyleGuideMutation.mutate({ guideline_id, name });
	};

	return { updateStyleGuide };
}