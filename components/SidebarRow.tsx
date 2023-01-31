import { FC, SVGProps } from "react";
import cn from "classnames";

type Props = {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  disabled?: boolean;
  onClick?: () => {};
};

const SidebarRow: FC<Props> = ({ Icon, disabled = true, onClick }) => {
  return (
    <div
      onClick={() => {
        onClick?.();
      }}
      className={cn(
        "flex items-center justify-center p-3 rounded-full transition-all duration-200",
        { "cursor-pointer": !disabled, "hover:bg-gray-100": !disabled }
      )}
    >
      <Icon
        className={cn("w-[1.6rem] h-[1.6rem]", { "text-gray-400": disabled })}
      />
    </div>
  );
};

export default SidebarRow;
