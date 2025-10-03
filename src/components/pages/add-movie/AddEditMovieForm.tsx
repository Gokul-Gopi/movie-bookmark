import { useAddMovie, useEditMovie } from "@/api/queries/movie.queries";
import ControlledTextarea from "@/components/form/ControlledTextarea";
import ControlledTextInput from "@/components/form/ControlledTextInput";
import ControlledYearPickerInput from "@/components/form/ControlledYearPickerInput";
import { IMovie } from "@/types/response";
import {
  addMovieSchemaWithFile,
  editMovieSchema,
} from "@/utils/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { Button } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { notifications } from "@mantine/notifications";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

interface IAddEditMovieForm {
  formData?: IMovie;
}

const AddEditMovieForm = ({ formData }: IAddEditMovieForm) => {
  const router = useRouter();
  const addMovie = useAddMovie();
  const editMovie = useEditMovie();

  const editMode = !!formData;

  const schema = useMemo(
    () => (!editMode ? addMovieSchemaWithFile : editMovieSchema),
    [editMode]
  );

  useEffect(() => {
    if (!editMode) return;
    form.reset({
      title: formData.title,
      description: formData.description,
      poster: formData.poster,
      publishedOn: formData.publishedOn,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode]);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = form.handleSubmit((data) => {
    if (editMode) {
      editMovie.mutate(
        { ...data, movieId: formData.id },
        {
          onSuccess: () => {
            notifications.show({
              message: "Movie edited successfully!",
              color: "green",
            });
            router.push("/");
          },
        }
      );

      return;
    }

    addMovie.mutate(data, {
      onSuccess: () => {
        notifications.show({
          message: "Movie added successfully!",
          color: "green",
        });
        router.push("/");
      },
    });
  });

  const onCancel = () => {
    router.push("/");
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className="flex gap-32 mb-20">
        <Controller
          name="poster"
          control={form.control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
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
                  {value ? (
                    editMode ? (
                      <div className="relative aspect-[9/16] w-[10rem]">
                        <Image
                          src={value as string}
                          alt="poster"
                          fill
                          className="object-cover rounded-[0.625rem]"
                        />
                      </div>
                    ) : (
                      <>
                        <Icon
                          icon="tabler:circle-check"
                          className="text-2xl text-primary"
                        />
                        <p className="text-center">{(value as File)?.name}</p>
                      </>
                    )
                  ) : (
                    <>
                      <Icon icon="tabler:download" className="text-2xl" />
                      <p>Drop an image here</p>
                      <p className="text-sm text-gray-400">
                        Maximum size: 5 MB
                      </p>
                    </>
                  )}
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
              type="submit"
              loading={addMovie.isPending || editMovie.isPending}
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default AddEditMovieForm;
