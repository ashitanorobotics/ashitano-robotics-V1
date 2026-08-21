import type { ComponentPropsWithoutRef } from "react";

type CtaButtonLinkProps = ComponentPropsWithoutRef<"a"> & {
  href: string;
};

type CtaButtonButtonProps = ComponentPropsWithoutRef<"button"> & {
  href?: undefined;
};

type CtaButtonProps = CtaButtonLinkProps | CtaButtonButtonProps;

function ctaClassName(className?: string) {
  return className ? `page-cta-button ${className}` : "page-cta-button";
}

export default function CtaButton(props: CtaButtonProps) {
  if (typeof props.href === "string") {
    const { href, className, ...rest } = props;
    return <a href={href} className={ctaClassName(className)} {...rest} />;
  }

  const { className, href: _href, ...rest } = props;
  return <button className={ctaClassName(className)} {...rest} />;
}
