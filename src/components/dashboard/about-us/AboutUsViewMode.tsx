// components/about/AboutUsViewMode.jsx
"use client";

interface AboutUsViewModeProps {
  formData: {
    heading: string;
    about: string;
    excellenceHeading: string;
    excellenceSubheading: string;
    points: string[];
    excellenceImage1: string;
    excellenceImages: string[];
  };
}

const AboutUsViewMode = ({ formData }: AboutUsViewModeProps) => {
  return (
    <div className="space-y-6">
      {/* Main Image */}
      {formData.excellenceImage1 && (
        <div>
          <h6 className="font-bold text-pBlue text-lg mb-3">Main Image</h6>
          <div className="relative w-60 h-60 rounded-lg overflow-hidden border border-gray-200">
            <img
              src={formData.excellenceImage1}
              alt="Main about image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Heading */}
      <div className="border rounded-md px-4 py-2">
        <h6 className="font-bold text-pBlue text-lg mb-2">Heading</h6>
        <p className="text-pGray">{formData.heading || "-"}</p>
      </div>

      {/* About Description */}
      <div className="border rounded-md px-4 py-2">
        <h6 className="font-bold text-pBlue text-lg mb-2">About Description</h6>
        <div 
          className="text-pGray prose max-w-none"
          dangerouslySetInnerHTML={{ __html: formData.about || "-" }}
        />
      </div>

      {/* Excellence Images */}
      {formData.excellenceImages && formData.excellenceImages.length > 0 && (
        <div>
          <h6 className="font-bold text-pBlue text-lg mb-3">Excellence Images</h6>
          <div className="flex flex-wrap gap-4">
            {formData.excellenceImages.map((img: string, idx: number) => (
              <div
                key={idx}
                className="relative w-32 lg:w-48 h-32 lg:h-48 rounded-lg overflow-hidden border border-gray-200"
              >
                <img
                  src={img}
                  alt={`Excellence image ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Excellence Heading */}
      <div className="border rounded-md px-4 py-2">
        <h6 className="font-bold text-pBlue text-lg mb-2">Excellence Heading</h6>
        <p className="text-pGray">{formData.excellenceHeading || "-"}</p>
      </div>

      {/* Excellence Subheading */}
      <div className="border rounded-md px-4 py-2">
        <h6 className="font-bold text-pBlue text-lg mb-2">Excellence Subheading</h6>
        <p className="text-pGray">{formData.excellenceSubheading || "-"}</p>
      </div>

      {/* Points */}
      {formData.points && formData.points.length > 0 && (
        <div>
          <h6 className="font-bold text-pBlue text-lg mb-3">Points</h6>
          <div className="space-y-2">
            {formData.points.map((point: string, idx: number) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-pBlue text-lg">•</span>
                <p className="text-pGray">{point}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutUsViewMode;