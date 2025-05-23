import { cn } from "@/src/lib/cn";
import Center from "./Center";

 
type Props = {
  title?: string;
  subTitle?: string;
  desc?: any;
  exSt?: string;
  exStTitle?: string;
  exStSubTitle?: string;
};

export default function Title({ title, subTitle, desc, exSt, exStTitle, exStSubTitle }: Props) {
  return (
    <Center>
      <div
        className={cn(
          'mb-[40px] mt-[96px] flex w-full flex-col items-center justify-center gap-2 text-center leading-[35px]',
          exSt && exSt
        )}>
        {title && (
          <div className={cn('text-[24px] font-[600] md:text-[70px]', exStTitle && exStTitle)}>
            {title}
          </div>
        )}
        {subTitle && (
          <div
            className={cn(
              'max-w-md text-[1rem] font-[400] text-darkColor-20 lg:text-[1.2rem]',
              exStSubTitle && exStSubTitle
            )}>
            {subTitle} {desc && <span className='font-[500] text-darkColor-800'>{desc} </span>}
          </div>
        )}
      </div>
    </Center>
  );
}
