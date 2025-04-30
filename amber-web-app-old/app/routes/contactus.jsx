import { ContactUsForm } from "../components/ContactUsForm";
import { Map } from "../components/GoogleMap";

export async function loader({ request }) {
    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
  
    return {
      GOOGLE_API_KEY,
    };
  }

export default function ContactUs() {
return (
    <div className="flex items-center w-full h-auto justify-center">
        <div className="px-6 w-full max-w-[1024px]">
        <div className="flex gap-8 flex-wrap">
            <div className="w-full sm:w-1/2">
              <h2 className="text-xl">Adres</h2>
              <p className="my-4">
                Orhangazi, Esenyalı Orhangazi Mah, Alparslan Türkeş Cd No:2/A.
                <br />
                <br />
                Pendik/İstanbul
              </p>
              <Map />
            </div>
            <div className="w-full sm:w-2/5 sm:flex-auto" id="contactUs">
              <h2 className="text-xl">Bize Ulaşın</h2>
              <div className="flex justify-center flex-col"><ContactUsForm /></div>
            </div>
          </div>
        </div>
    </div>
);
}
