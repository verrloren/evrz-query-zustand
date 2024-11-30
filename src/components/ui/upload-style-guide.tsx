'use client';

import type { UploadProps } from 'antd';
import { Upload } from 'antd';
import { Button } from './button';
import { UploadIcon } from '@radix-ui/react-icons';
import { StyleGuide } from '@/lib/types';
import { sendStyleGuide } from '@/action/sendStyleGuide';

interface UploadStyleGuideProps {
  onFileSelect: (file: StyleGuide) => void;
	languageId: string;
}






export function UploadStyleGuide ({ onFileSelect, languageId }: UploadStyleGuideProps) {
	

  const props: UploadProps = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    accept: '.txt,.pdf,.doc,.docx,.jpg,.png,.gif,.zip,.rar',
    
    beforeUpload: async (file: File) => {
      try {
        const newFile: StyleGuide = {
          id: languageId,
          name: file.name,
          file
        };
				console.log('newFile', newFile);

        // Create FormData
        const formData = new FormData();
        formData.append('file', file);
        formData.append('languageId', languageId);
        formData.append('subject', file.name.substring(0, file.name.lastIndexOf('.')) || file.name);

				console.log('before fetch', formData);
				console.log('file:', formData.get('file'))

        // Upload file
        const result = await sendStyleGuide(formData);

				console.log('after fetch', result);


        if (!result.success) {
          throw new Error(result.response);
        }

        // Update UI only after successful upload
        onFileSelect(newFile);
        console.log('File uploaded successfully:', newFile.name);
      } catch (error) {
        console.error('Upload failed:', error);
        alert(error instanceof Error ? error.message : 'Upload failed');
      }

      return false; // Prevent default upload
    },
  };


	
	return (
		<Upload 
		style={{ zIndex: 50 }}
		{...props}>
			<Button
			 className='rounded-full w-12 h-12 flex items-center justify-center
        text-neutral-400 bg-black border border-neutral-800 
        hover:text-neutral-200 hover:border-neutral-200 transition-colors z-50' 
			 >
				<UploadIcon className="w-5 h-5" />
				</Button>
		</Upload>
	)

}