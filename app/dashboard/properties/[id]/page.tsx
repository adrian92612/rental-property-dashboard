import { getProperty, getUser, PropertyWithUnits } from "@/app/lib/actions";
import { DeleteEditBtn } from "@/app/ui/delete-edit-button";
import { redirect } from "next/navigation";
import { FaLocationDot } from "react-icons/fa6";

const PropertyDetailsPage = async ({ params }: { params: { id: string } }) => {
  const [user, property] = await Promise.all([
    await getUser(),
    (await getProperty(params.id)) as PropertyWithUnits,
  ]);

  const { name, address } = property;

  if (!property || !user) redirect("/dashboard/properties");

  return (
    <div className="p-4">
      <section className="flex border-2 border-cyan-900 w-fit p-4 rounded-lg">
        <div className="w-[300px] h-[200px] flex justify-center items-center">Image Container</div>
        <div className="flex flex-col">
          <h2 className="font-poppins font-normal text-xl ">{name}</h2>
          <p className="flex items-center gap-2 ">
            <FaLocationDot /> {address}
          </p>
          <p className="mt-auto">Owner: {user?.name}</p>
          <p>Contact Info: {user.email}</p>
          <DeleteEditBtn id={property.id} model="property" />
        </div>
      </section>
    </div>
  );
};

export default PropertyDetailsPage;
