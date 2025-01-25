import { Button } from "@/components/ui/button";
import useAuth from "@/Hooks/useAuth";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import Loading from "@/Pages/Loading/Loading";
import Title from "@/Shared/Title/Title";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const MyProfile = () => {
  const { user, loading, setLoading, updateUserProfile } = useAuth();
  const [profile, setProfile] = useState({});
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/email?email=${user.email}`).then((res) => {
        setProfile(res.data);
        setLoading(false);

        // Set default values for the form
        if (res.data) {
          setValue("name", res.data.name || "");
          setValue("email", res.data.email || "");
          setValue("phone", res.data.phone || "");
          setValue("role", res.data.role || "default");
        }
      });
    }
  }, [user?.email, axiosSecure, setValue, setLoading]);

  const onSubmit = async (data) => {
    const imageFile = data.image?.[0];
    let imageURL = profile?.image;

    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);

      const res = await axiosPublic.post(image_hosting_api, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        imageURL = res.data.data.display_url;
      }
    }

    // eslint-disable-next-line no-unused-vars
    const { _id, ...profileWithoutId } = profile;

    // Creating the payload here
    const updatedProfile = {
      ...profileWithoutId,
      ...data,
      image: imageURL,
    };

    // Updating firebase here
    await updateUserProfile (data.name, imageURL)

    // Database update here
    const menuRes = await axiosSecure.patch(
      `/users/${profile._id}`,
      updatedProfile
    );

    if (menuRes.data.modifiedCount > 0) {
      Swal.fire({
        title: "Good job!",
        text: `You have successfully updated your profile!`,
        icon: "success",
      });

      // Update the local profile state
      const refreshedProfile = await axiosSecure.get(
        `/users/email?email=${user.email}`
      );
      setProfile(refreshedProfile.data);
    }
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <header>
        <Title
          mainTitle="My Profile"
          subTitle="You can see your profile and update it here!"
        ></Title>
      </header>

      <main className="max-w-[90%] mx-auto">
        <div className="lg:w-[80%] w-full bg-white shadow-xl bg-opacity-60 p-4 rounded-md mx-auto">
          {/* form div here */}
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            {/* Photo div */}
            <div className="flex flex-col">
              <div>
                <img
                  className="w-[300px] h-[300px] mx-auto mb-4 rounded-md object-cover"
                  src={profile.image}
                  alt=""
                />
              </div>
              <input
                {...register("image")}
                type="file"
                className="file-input max-w-xs mx-auto mb-4 bg-white"
              />
            </div>
            {/* Photo div */}

            {/* Name div */}
            <div className="flex flex-col">
              <div>
                <p className="text-sm mb-1">Your Name :</p>
              </div>
              <input
                type="text"
                className="border rounded-md py-1 px-2 w-full"
                placeholder="Enter Your Name"
                defaultValue={profile.name}
                name="name"
                {...register("name")}
              />
              {errors.name && (
                <span className="text-red-600 mt-2 ml-1">
                  Your Name is required
                </span>
              )}
            </div>
            {/* Name div */}

            {/* Email div */}
            <div className="mt-4 flex flex-col">
              <div>
                <p className="text-sm mb-1">Your Email :</p>
              </div>
              <input
                type="email"
                className="border rounded-md py-1 px-2 w-full"
                placeholder="Enter Your Email"
                defaultValue={profile.email}
                name="email"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-600 mt-2 ml-1">
                  Your Email is required
                </span>
              )}
            </div>
            {/* Email div */}

            {/* Phone Number div */}
            <div className="mt-4 flex flex-col">
              <div>
                <p className="text-sm mb-1">Your Phone Number :</p>
              </div>
              <input
                type="tel"
                defaultValue={profile.phone}
                className="border rounded-md py-1 px-2 w-full"
                placeholder="Enter Your Phone Number"
                name="phone"
                {...register("phone")}
              />
              {errors.phone && (
                <span className="text-red-600 mt-2 ml-1">
                  Your Phone Number is required
                </span>
              )}
            </div>
            {/* Phone Number div */}

            {/* Category select div */}
            <div className="mt-4 flex flex-col">
              <div>
                <p className="text-sm mb-1">Your Role :</p>
              </div>
              <select
                className="py-1 px-2 rounded-md border w-full"
                value={profile.role}
                name="role"
                {...register("role")}
              >
                <option disabled value="default">
                  Select A Category
                </option>
                <option value="generalUser">General User</option>
                <option value="deliveryMan">Delivery Man</option>
              </select>
              {errors.category && (
                <span className="text-red-600 mt-2 ml-1">
                  {errors.category.message}
                </span>
              )}
            </div>
            {/* Category select div */}

            {/* Submit Button div */}
            <div className="mt-8 w-full">
              <Button
                className="bg-[#00e699] text-black rounded-md font-medium transition-all ease-in-out hover:bg-[#2a5a42] hover:text-white hover:-translate-y-2 w-full"
                type="submit"
              >
                Update
              </Button>
            </div>
            {/* Submit Button div */}
          </form>
          {/* form div here */}
        </div>
      </main>
    </div>
  );
};

export default MyProfile;
