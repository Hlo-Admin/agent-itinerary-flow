import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<NavLinkProps, "className" | "children"> {
  className?: string | ((props: { isActive: boolean; isPending: boolean }) => string);
  activeClassName?: string;
  pendingClassName?: string;
  children?: React.ReactNode | ((props: { isActive: boolean; isPending: boolean }) => React.ReactNode);
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, children, to, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        className={({ isActive, isPending }) => {
          const baseClassName = typeof className === 'function' 
            ? className({ isActive, isPending }) 
            : className;
          return cn(baseClassName, isActive && activeClassName, isPending && pendingClassName, isActive && 'active');
        }}
        {...props}
      >
        {typeof children === 'function' 
          ? ({ isActive, isPending }: { isActive: boolean; isPending: boolean }) => children({ isActive, isPending })
          : children
        }
      </RouterNavLink>
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
