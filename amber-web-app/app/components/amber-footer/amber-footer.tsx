import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { AmberLogo } from "~/assets/AmberLogo";
import {FooterInstagramIcon} from "~/assets/FooterInstagramIcon"

export default function AmberFooter() {
  const {t} = useTranslation();
  return (
    <footer className="w-full h-auto bottom-0 left-0 px-6 py-12 flex items-center justify-center flex-col">
      <div className="flex gap-8 max-w-[1024px] mb-4">
        <div className="flex justify-between items-center flex-1 gap-2">
        <div style={{ width: "90px" }}>
            <AmberLogo />
        </div>
        <span>
          <div className="text-amber-500 font-semibold text-lg leading-3">
            Amber
          </div>
          <span className="text-amber-500 text-sm sm:text-base">
            {t("bannerTitle")}
          </span>
        </span>
          <div className="hidden sm:block">
            <div>+90 552 713 82 04</div>
            <div>info@clinicamber.com</div>
          </div>
        </div>
        <div className="flex justify-between flex-1 gap-6">
          <div className="flex flex-col justify-center gap-2">
              <a href="https://www.instagram.com/clinic.amber/">
                <div className="flex items-center gap-2">
                  <FooterInstagramIcon /> clinic.amber
                </div>
              </a>
              <a href="https://www.instagram.com/amberkidss/">
                <div className="flex items-center gap-2">
                  <FooterInstagramIcon /> amberkidss
                </div>
              </a>
            <a href="tel:5527138204">
              <div className="sm:hidden">+90 552 713 82 04</div>
            </a>
            <div className="sm:hidden">info@clinicamber.com</div>
          </div>
          <div className="hidden sm:block">
            Orhangazi, Esenyalı Orhangazi Mah, Alparslan Türkeş Cd
            No:2/A. Pendik/İstanbul
          </div>
        </div>
      </div>
      <div className="flex gap-4 flex-col sm:flex-row w-full max-w-[1024px] mx-6 py-4 border-t border-amber-400 justify-between items-center">
        <div className="hover:text-amber-500 transition"><Link to="/kvkk">Kişisel Veri İzleme Politikası</Link></div>
        <div>Copyright © 2024 Clinic Amber | Tüm hakları saklıdır</div>
      </div>
    </footer>
  )
}