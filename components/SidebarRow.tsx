import { SVGProps } from "react";

type Props = {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  onClick?: () => {};
};

const SidebarRow = ({ Icon, title, onClick }: Props) => {
  return (
    <div
      onClick={() => {
        onClick?.();
      }}
      className="group md:w-full"
    >
      <div className="flex max-w-fit cursor-pointer items-center space-x-2 px-4 py-3 rounded-full group-hover:bg-gray-100 transition-all duration-200 ">
        <Icon className="w-5 h-5 lg:w-6 lg:h-6" />
        <p className="hidden group-hover:text-twitter md:inline-flex text-base font-light lg:text-xl text-ellipsis overflow-hidden">
          {title}
        </p>
      </div>
    </div>
  );
};

export default SidebarRow;
