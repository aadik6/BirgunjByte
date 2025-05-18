import { Label } from "@radix-ui/react-label";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useForm } from "react-hook-form";
import { NewsFormValue, newsSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import TinyEditor from "../tinyEditor";
import FileDropzone from "../fileTdrag";
import axios from "axios";
import { createNews } from "@/apis/news";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";
import useCategoryStore from "@/stores/useCategoryStore";
import { useAuthStore } from "@/stores/authStore";

const AddNews = () => {
  const [posting, setPosting] = useState<boolean>(false);
  const [fileDropzoneKey, setFileDropzoneKey] = useState<number>(0);
  const [imageError, setImageError] = useState<string | null>(null);
  const {
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm<NewsFormValue>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      heading: "",
      description: "",
      category: "",
      isBreaking: false,
      isFeatured: false,
      author: true,
    },
  });
  const { categories, fetchCategories } = useCategoryStore();
  const headingValue = watch("heading");
  const descriptionValue = watch("description");
  const categoryValue = watch("category");
  const { user } = useAuthStore();

  useEffect(() => {
    if (headingValue) clearErrors("heading");
    if (descriptionValue) clearErrors("description");
    if (categoryValue) clearErrors("category");
  }, [headingValue, descriptionValue, categoryValue, clearErrors]);

  useEffect(() => {
    if (categories.length === 0) fetchCategories();
  }, []);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const validateImageFile = (): boolean => {
    if (!imageFile) {
      setImageError("Image is required.");
      return false;
    }

    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(imageFile.type)) {
      setImageError("Only JPEG and PNG formats are allowed.");
      return false;
    }

    setImageError(null); // Clear error if valid
    return true;
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "birgunj-byte");
    formData.append("cloud_name", "dyzn3fmuv");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_CLOUDINARY_URL}`,
        formData
      );
      const imageUrl = response.data.secure_url;
      console.log(imageUrl, "Image URL");
      return imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const onSubmit = async (data: NewsFormValue) => {
    if (!validateImageFile()) return; // Validate image file before proceeding
    try {
      setPosting(true);
      if (imageFile) {
        console.log("Uploading image...");
        const imageUrl = await uploadImage(imageFile); // Upload file to Cloudinary
        if (!imageUrl) {
          console.error("Image upload failed");
          return; // Stop further submission if image upload fails
        }
        data.image = imageUrl;
      }

      console.log("Submitting form to backend...");
      const res = await createNews(data);
      setPosting(false);
      console.log("Form submitted successfully:", res);

      toast.success("News posted successfully!");
      reset();
      setFileDropzoneKey((prevKey) => prevKey + 1);
      setValue("heading", "");
      setValue("description", "");
      setImageError(null);
    } catch (error) {
      setPosting(false);
      console.error("Error during form submission:", error);
      toast.error("Something went wrong, please try again");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="container">
        <div className="grid gap-4 p-4 border">
          <div className="grid items-center gap-2">
            <Label htmlFor="heading">
              Heading:{" "}
              {errors.heading && (
                <span className="text-red-500">{errors.heading.message}</span>
              )}
            </Label>
            <TinyEditor
              content={watch("heading")}
              setContent={(value) => setValue("heading", value)}
              disabled={false}
              menuBar={false}
              config={{}}
            />
          </div>
          <Separator />
          <div className="grid items-center gap-2">
            <Label htmlFor="description">
              Description:{" "}
              {errors.description && (
                <span className="text-red-500">
                  {errors.description.message}
                </span>
              )}
            </Label>
            <TinyEditor
              content={watch("description")}
              setContent={(value) => setValue("description", value)}
              disabled={false}
              menuBar={true}
              Height={500}
              config={{
                toolbar:
                  "pramukhime |undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags  | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
              }}
            />
          </div>
          <Separator />
          <div className="flex flex-wrap items-baseline justify-self-start gap-3.5">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <Label htmlFor="category">Category:</Label>
                <Select onValueChange={(value) => setValue("category", value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {errors.category && (
                <span className="text-red-500">{errors.category.message}</span>
              )}
            </div>
            <div className=" flex items-baseline gap-2">
              <Label htmlFor="author">Author:</Label>
              <Select
                onValueChange={(value) => setValue("author", value === "true")}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Author name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="true">
                      {user?.firstName} {user?.lastName}
                    </SelectItem>
                    <SelectItem value="false">None</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Separator />
          <div className="">
            <Label htmlFor="image">
              Image:{" "}
              {imageError && <span className="text-red-500">{imageError}</span>}
            </Label>
            <FileDropzone
              key={fileDropzoneKey}
              accept="image/*"
              multiple={false}
              onDrop={(files) => {
                const file = files[0];
                const validTypes = ["image/jpeg", "image/png"];

                if (!file) {
                  setImageError("Image is required.");
                  setImageFile(null);
                  return;
                }

                if (!validTypes.includes(file.type)) {
                  setImageError("Only JPEG and PNG formats are allowed.");
                  setImageFile(null);
                  return;
                }

                // Clear error and set file if valid
                setImageFile(file);
                setImageError(null);
              }}
              onRemove={() => {
                setImageFile(null);
                setImageError("Image is required."); // Set error when the file is removed
              }}
            />
          </div>
          <Separator />
          <div className="flex items-center gap-2">
            <Switch
              id="isBreakingNews"
              className="cursor-pointer"
              checked={watch("isBreaking")}
              onCheckedChange={(checked) => setValue("isBreaking", checked)}
            />
            <Label htmlFor="isBreakingNews" className="cursor-pointer">
              Breaking News:
            </Label>
            <Switch
              id="isFeaturedNews"
              className="cursor-pointer"
              checked={watch("isFeatured")}
              onCheckedChange={(checked) => setValue("isFeatured", checked)}
            />
            <Label htmlFor="isFeaturedNews" className="cursor-pointer">
              Featured News:
            </Label>
          </div>
          <Separator />
          <Button
            type="submit"
            className="w-full cursor-pointer bg-purple-600 hover:bg-purple-800"
          >
            {posting ? (
              <div className="flex items-center gap-2">
                <LoaderIcon className="animate-spin" />
                Posting
              </div>
            ) : (
              "Post News"
            )}
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddNews;
