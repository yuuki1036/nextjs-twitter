import { FC, SVGProps } from "react";

type Props = {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  onClick?: () => {};
};

const MobileMenuRow: FC<Props> = ({ Icon, onClick }) => {
  return (
    <div
      onClick={() => onClick?.()}
      className="w-[2.3rem] h-[2.3rem] flex items-center justify-center hover:bg-gray-200 rounded-full"
    >
      <Icon className="w-[1.6rem] h-[1.6rem]" />
    </div>
  );
};

export default MobileMenuRow;
