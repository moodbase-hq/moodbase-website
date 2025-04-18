// src/components/shared/CTA.jsx
--- a/src/components/shared/CTA.js
+++ b/src/components/shared/InfoCard.js
const InfoCard = ({
  title,
  description,
  backgroundColor,
  children,
}) => {
  const sectionStyle = {
    backgroundColor: backgroundColor || "#f0f0f0",
  };

  return (
    <section className="relative">
      <div
        className="max-w-3xl mx-auto text-center rounded-2xl p-8 shadow-lg"
        style={sectionStyle}
      >
        {title && (
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
        )}
        {description && <p className="text-gray-800 mb-8">{description}</p>}
        {children && <div>{children}</div>}
      </div>
    </section>
  );
};

export default InfoCard;