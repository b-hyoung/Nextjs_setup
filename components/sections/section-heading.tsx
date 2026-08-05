import React from "react";

/** 섹션 공통 헤딩 */
const SectionHeading = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <div className="text-center">
      <h2 className="text-balance text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl whitespace-pre-line text-base leading-relaxed text-neutral-600">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
