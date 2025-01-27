import logo from "../../assets/images/logo/logo.webp"

const Footer = () => {
  return (
    <footer className="bg-[#00e699] text-black py-6 text-center bg-opacity-80 mt-10">
        <div className="flex justify-center mb-10">
            <img className="w-[100px] h-[100px] rounded-full" src={logo} alt="" />
        </div>  
      <div>
      <p className="text-sm">
        © {new Date().getFullYear()} PackNGo. All rights reserved. <br /> Simplifying
        parcel management one delivery at a time. 
      </p>
      </div>
    </footer>
  );
};

export default Footer;
