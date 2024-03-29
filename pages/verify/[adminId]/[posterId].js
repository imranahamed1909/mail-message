import { useState } from "react";
import { toast } from "react-toastify";
import { API_URL, site } from "@/config";

export default function HomePage({ posterId }) {
  const [formValues, setFormValues] = useState({
    posterId: posterId,
    text: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log("values", formValues);

    const url = `${API_URL}/user/notification`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      const data = await res.json();

      if (res.ok) {
        setFormValues({ text: "" });
        console.log("success", data);
        toast.success("Message sent");
      } else {
        toast.error("Something went wrong");
        console.log("error", data);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log("error", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-[350px] lg:w-[700px] p-5 lg:p-10 border border-gray-400 rounded-lg">
        <form onSubmit={handleSubmit}>
          <label htmlFor="text" className="inline-block text-xl font-bold mb-2">
            Enter message
          </label>
          <textarea
            id="text"
            name="text"
            value={formValues.text}
            onChange={handleChange}
            placeholder="Write messsage here"
            required
            rows={6}
            className="w-full rounded-md px-3 py-4 border border-slate-300 focus:outline-2 focus:outline-blue-500 placeholder:text-base placeholder:text-gray-500"
          />
          <button
            type="submit"
            className="mt-5 bg-[#1a73e8] py-2 px-6 rounded text-white font-medium"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps({
  req,
  query: { adminId, posterId },
}) {
  const userAgent = req.headers["user-agent"];

  const isMobileView = userAgent.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  );

  const isTabletView = userAgent.match(
    /Tablet|iPad|Playbook|Silk|Kindle|(Android(?!.*Mobile))/i
  );

  const device = isMobileView ? "phone" : isTabletView ? "ipad" : "desktop";

  const url = `${API_URL}/${site}/${adminId}/${posterId}/${device}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data?.success !== "exists") {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      posterId: posterId,
    },
  };
}
