import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { UserForm, userSchema } from "@/schema";
import { addUser } from "@/apis/user";

const AddUser = () => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const {
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserForm>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      role: "user",
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const firstNameValue = watch("firstName");
  const lastNameValue = watch("lastName");
  const userNameValue = watch("userName");
  const emailValue = watch("email");
  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");
  useEffect(() => {
    if (firstNameValue) clearErrors("firstName");
    if (lastNameValue) clearErrors("lastName");
    if (userNameValue) clearErrors("userName");
    if (emailValue) clearErrors("email");
    if (passwordValue) clearErrors("password");
    if (confirmPasswordValue) clearErrors("confirmPassword");
  }, [
    firstNameValue,
    lastNameValue,
    userNameValue,
    emailValue,
    passwordValue,
    confirmPasswordValue,
    clearErrors,
  ]);

  // Validate image file
  const validateImageFile = (): boolean => {
    if (!imageFile) {
      setImageError("Avatar is required.");
      return false;
    }
    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(imageFile.type)) {
      setImageError("Only JPEG and PNG formats are allowed.");
      return false;
    }
    setImageError(null);
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
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  // Handle avatar file input
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageFile(file || null);
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    } else {
      setAvatarPreview(null);
    }
  };

  // Submit handler
  const onSubmit = async (data: UserForm) => {
    if (!validateImageFile()) return;
    try {
      let avatarUrl = "";
      if (imageFile) {
        avatarUrl = (await uploadImage(imageFile)) || "";
        if (!avatarUrl) {
          setImageError("Image upload failed");
          return;
        }
      }
      // Prepare payload
      const payload = { ...data, avatar: avatarUrl };
      // Send data to server
      const res = await addUser(payload);
      console.log(res, "userdAdded");
      toast.success("User added successfully!");
      reset();
      setAvatarPreview(null);
      setImageFile(null);
    } catch (error) {
      toast.error("Something went wrong, please try again");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader>
          <CardTitle>Add User</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex gap-3">
              <div className="flex-1 flex flex-col gap-1.5">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={watch("firstName")}
                  onChange={(e) => {
                    setValue("firstName", e.target.value);
                  }}
                />
                {errors.firstName && (
                  <span className="text-red-500 text-xs">
                    {errors.firstName.message}
                  </span>
                )}
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={watch("lastName")}
                  onChange={(e) => {
                    setValue("lastName", e.target.value);
                  }}
                />
                {errors.lastName && (
                  <span className="text-red-500 text-xs">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="userName">Username</Label>
              <Input
                id="userName"
                value={watch("userName")}
                onChange={(e) => {
                  setValue("userName", e.target.value);
                }}
              />
              {errors.userName && (
                <span className="text-red-500 text-xs">
                  {errors.userName.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={watch("email")}
                onChange={(e) => {
                  setValue("email", e.target.value);
                }}
              />
              {errors.email && (
                <span className="text-red-500 text-xs">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <Label htmlFor="role">Role</Label>
              <Select
                onValueChange={(value) =>
                  setValue("role", value as UserForm["role"])
                }
                defaultValue="author"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="author">Author</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <span className="text-red-500 text-xs">
                  {errors.role.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="avatar">Avatar</Label>
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
              />
              {imageError && (
                <span className="text-red-500 text-xs">{imageError}</span>
              )}
              {avatarPreview && (
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  className="w-16 h-16 rounded-full mt-2"
                />
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={watch("password")}
                onChange={(e) => {
                  setValue("password", e.target.value);
                }}
              />
              {errors.password && (
                <span className="text-red-500 text-xs">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={watch("confirmPassword")}
                onChange={(e) => {
                  setValue("confirmPassword", e.target.value);
                }}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-xs">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add User"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddUser;
