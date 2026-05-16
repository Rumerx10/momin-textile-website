interface HomeViewModalProps {
  existingImageUrls: string[];
  formData: {
    heading: string;
    subheading: string;
    button1Name: string;
    button1Url: string;
    button2Name: string;
    button2Url: string;
  };
}
const HomeViewModal = ({ existingImageUrls, formData }: HomeViewModalProps) => {
  return (
    <div className="space-y-6">
      {existingImageUrls.length > 0 && (
        <div>
          <h6 className="font-bold text-pBlue text-lg mb-3">Carousel Images</h6>
          <div className="flex flex-wrap gap-4">
            {existingImageUrls.map((img: string, idx: number) => (
              <div
                key={idx}
                className="relative w-32 lg:w-60 h-32 lg:h-60 rounded-lg overflow-hidden border border-gray-200"
              >
                <img
                  src={img}
                  alt={`Carousel ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
                  {idx + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="border rounded-md px-4 py-2">
        <h6 className="font-bold text-pBlue text-lg mb-2">Heading Text</h6>
        <p className="text-pGray">{formData.heading || "-"}</p>
      </div>

      <div className="border rounded-md px-4 py-2">
        <h6 className="font-bold text-pBlue text-lg mb-2">Subheading Text</h6>
        <p className="text-pGray whitespace-pre-wrap">
          {formData.subheading || "-"}
        </p>
      </div>

      <div>
        <div className="flex gap-5 items-center justify-between">
          <div className="flex flex-1 flex-col">
            <h6 className="font-bold text-pBlue text-lg mb-2">
              Button 01 Name
            </h6>
            <p className="text-pBlue font-medium mb-3 border px-4 py-2 rounded-md">
              {formData.button1Name || "-"}
            </p>
          </div>
          <div className="flex flex-1 flex-col">
            <h6 className="font-bold text-pBlue text-lg mb-2">URL 01</h6>
            <p className="text-pBlue font-medium break-all mb-3 border px-4 py-2 rounded-md">
              {formData.button1Url || "-"}
            </p>
          </div>
        </div>
        <div className="flex gap-5 items-center justify-between">
          <div className="flex flex-1 flex-col">
            <h6 className="font-bold text-pBlue text-lg mb-2">
              Button 02 Name
            </h6>
            <p className="text-pBlue font-medium mb-3 border px-4 py-2 rounded-md">
              {formData.button2Name || "-"}
            </p>
          </div>
          <div className="flex flex-1 flex-col">
            <h6 className="font-bold text-pBlue text-lg mb-2">URL 02</h6>
            <p className="text-pBlue font-medium break-all mb-3 border px-4 py-2 rounded-md">
              {formData.button2Url || "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeViewModal;
