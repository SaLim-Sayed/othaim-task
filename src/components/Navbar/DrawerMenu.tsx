import { cn } from "@/src/lib/cn";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { links } from "./links";
import { Button } from "@heroui/react";
import SearchAutocomplete from "./SearchAutocomplete";

export default function DrawerMenu({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}) {
  const router = useRouter();
  useEffect(() => {
    if (isMenuOpen) {
      document.documentElement.classList.add("overflow-hidden");
      document.body.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen]);
  return (
    <>
      <div
        className={`fixed inset-0 z-[30] bg-black bg-opacity-50 transition-opacity ${isMenuOpen ? "visible opacity-100" : "invisible opacity-0"
          }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div
        className={cn(
          "fixed left-0 right-0 top-10 z-[40] mx-auto block  rounded-b-3xl w-[90%] transform bg-gray-100 shadow-lg transition-transform md:hidden",
          isMenuOpen ? "translate-y-0" : "-top-12 -translate-y-full"
        )}
      >
        <div className='mx-auto mt-16 mb-24 flex w-[89%] flex-col space-y-4 p-4'>
          <SearchAutocomplete setIsMenuOpen={setIsMenuOpen} />

          {links.map((link) => (
            <Button
              key={link.label}
              onPress={() => {
                setIsMenuOpen(false);
                router.push(link.href);
              }}
              className='w-full rounded-md font-bold border border-secondaryColor-900 bg-white   hover:bg-secondaryColor-900 px-4 py-2 text-left text-secondaryColor-900 hover:text-primaryColor-900 transition'>
              {link.label}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
}
