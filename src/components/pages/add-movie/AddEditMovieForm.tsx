import ControlledTextarea from "@/components/form/ControlledTextarea";
import ControlledTextInput from "@/components/form/ControlledTextInput";
import ControlledYearPickerInput from "@/components/form/ControlledYearPickerInput";
import { addMovieSchema } from "@/utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { Button } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useRouter } from "next/router";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const AddEditMovieForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof addMovieSchema>>({
    resolver: zodResolver(addMovieSchema),
  });

  const onSubmit = form.handleSubmit((_data) => {
    router.push("/");
  });

  const onCancel = () => {
    router.push("/");
  };

  return (
    <FormProvider {...form}>
      <div className="flex gap-32 mb-20">
        <Controller
          name="poster"
          control={form.control}
          render={({ field: { onChange }, fieldState: { error } }) => (
            <div className="flex-1 max-w-[30rem] h-[31.5rem]">
              <Dropzone
                onDrop={(files) => onChange(files[0])}
                classNames={{
                  root: "rounded-[0.625rem] bg-transparent flex items-center justify-center border-2 border-dashed h-full",
                }}
                multiple={false}
                maxSize={5 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
              >
                <div className="flex flex-col gap-2 items-center text-white">
                  <Icon icon="tabler:download" className="text-2xl" />
                  <p>Drop an image here</p>
                  <p className="text-sm text-gray-400">Maximum size: 5 MB</p>
                </div>
              </Dropzone>
              {error?.message && (
                <p className="text-sm mt-1 text-red-500">{error.message}</p>
              )}
            </div>
          )}
        />

        <div className="flex flex-col gap-6 flex-1 max-w-[40rem]">
          <ControlledTextInput name="title" placeholder="Title" />

          <ControlledTextarea
            name="description"
            placeholder="Description"
            rows={5}
          />
          <ControlledYearPickerInput
            name="publishedOn"
            placeholder="Publishing year"
            maxDate={new Date()}
          />

          <div className="flex gap-2">
            <Button
              classNames={{
                root: "w-full max-w-[10.5rem] h-[3.5rem]",
                label: "text-base",
              }}
              onClick={onCancel}
              color="white"
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              classNames={{
                root: "w-full max-w-[10.5rem] h-[3.5rem]",
                label: "text-base",
              }}
              onClick={onSubmit}
              type="submit"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default AddEditMovieForm;
