import { useEffect, useState } from "@wordpress/element";
import {
  PlainText,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";
import { SelectControl } from "@wordpress/components";
import "@wordpress/dashicons";

wp.blocks.registerBlockType("green-blocks/vehicles-post-loop", {
  title: "Vehicles Post Loop",
  icon: "dashicon dashicons-car",
  category: "common",
  attributes: {
    grid_width: { type: "string", default: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" },
    column_width: { type: "string", default: "col-span-1" },
    padding_top: { type: "string", default: "pt-16" },
    padding_bottom: { type: "string", default: "pb-16" },
    style: { type: "string", default: "text-slate-900 text-slate-50 border-slate-400" },
    button: { type: "string", default: "bg-slate-700 !text-slate-50 hover:!bg-slate-50 hover:!text-slate-700 hover:!border-slate-50"}
  },
  edit: function (props) {
    const { attributes, setAttributes } = props;
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
      fetch("http://bc-govt-test.local/wp-json/wp/v2/vehicle?per_page=5")
        .then((response) => response.json())
        .then((data) => {
          Promise.all(
            data.map((vehicle) =>
              fetch(vehicle._links["wp:featuredmedia"][0].href)
                .then((resp) => resp.json())
                .then((image) => ({
                  ...vehicle,
                  featured_image: image.source_url,
                }))
            )
          ).then((vehiclesWithImages) => setVehicles(vehiclesWithImages));
        });
    }, []);

    const onGridWidthChange = (grid_width) => {
      props.setAttributes({ grid_width });
    };
  
    const onColumnWidthChange = (column_width) => {
      props.setAttributes({ column_width });
    };
  
    const onPaddingTopChange = (padding_top) => {
      props.setAttributes({ padding_top });
    };
  
    const onPaddingBottomChange = (padding_bottom) => {
      props.setAttributes({ padding_bottom });
    };
  
    const onStyleToggleChange = (style) => {
      props.setAttributes({ style });
    };

    const onButtonToggleChange = (button) => {
      props.setAttributes({ button });
    }
    

    return (
      <>
        <InspectorControls>
          <SelectControl
              className="mx-2"
              label="Style"
              value={props.attributes.style}
              options={[
                { label: "Default", value: "text-slate-900 text-slate-50 border-slate-300" },
                { label: "Dark", value: "text-slate-50 bg-slate-800 border-slate-600" },
              ]}
              onChange={onStyleToggleChange}
            />
            <SelectControl
            className="mx-2"
              label="Button Style"
              value={props.attributes.button}
              options={[
                { label: "Dark Button", value: "bg-slate-700 !text-slate-50 hover:bg-slate-50 hover:!text-slate-700 hover:border-slate-50" },
                { label: "Light Button", value: "bg-slate-50 !text-slate-700 hover:bg-slate-700 hover:!text-slate-50 hover:border-slate-700" },
      
              ]}
              onChange={onButtonToggleChange}
            />
            <SelectControl
            className="mx-2"
              label="Post Width"
              value={props.attributes.grid_width}
              options={[
                { label: "Full Width", value: "grid-cols-1" },
                { label: "Two Wide", value: "grid-cols-1  lg:grid-cols-2" },
                { label: "Three Wide", value: "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3" },
              ]}
              onChange={onGridWidthChange}
            />
      
            <SelectControl
            className="mx-2"
              label="Padding Top"
              value={props.attributes.padding_top}
              options={[
                { label: "Small", value: "pt-9" },
                { label: "Medium", value: "pt-24" },
                { label: "Large", value: "pt-36" },
              ]}
              onChange={onPaddingTopChange}
            />
            <SelectControl
            className="mx-2"
              label="Padding Bottom"
              value={props.attributes.padding_bottom}
              options={[
                { label: "Small", value: "pb-9" },
                { label: "Medium", value: "pb-24" },
                { label: "Large", value: "pb-36" },
              ]}
              onChange={onPaddingBottomChange}
            />
        </InspectorControls>

        <div
          className={`!max-w-full w-full green-blocks-vehicle-posts px-6 justify-center mx-auto flex ${attributes.padding_top} ${attributes.padding_bottom} ${attributes.style}`}
        >
            <div className={`container grid gap-3 ${attributes.grid_width}`}>
              {vehicles &&
                vehicles.map((vehicle) => (


                  <div key={vehicle.id} className="border rounded-md p-5">
                     
                     <a href={vehicle.link}>
                      <img
                        className="object-contain rounded-md hover:scale-105 transition-all duration-300 ease-in-out max-h-32"
                        src={vehicle.featured_image}
                        alt={vehicle.title.rendered}
                      />
                    </a>

                    <h4 className="my-0">{vehicle.title.rendered}</h4>
                   <p class="text-sm  mb-2 w-fit py-1 px-2 bg-slate-500 text-slate-50 rounded-md duration-200 ease-in-out transition hover:bg-slate-700">Vehicle Type</p>
                    <p className="text-sm mb-4">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: vehicle.excerpt.rendered,
                        }}
                      />
                    </p>
                    <a
                      className={`text-sm border rounded-md py-2 px-4 !no-underline transition duration-200 ease-in-out ${attributes.button}`}
                      href={vehicle.link}
                      target="_blank"
                    >Read More</a>

                  </div>
                ))}
            </div>
          </div>
      </>
    );
  },

  save: function (props) {
    return (
      <>
        {props.attributes && (
          <pre style={{ display: "none" }}>
            {JSON.stringify(props.attributes)}
          </pre>
        )}
        <div
          className={`green-blocks-vehicle-posts container mx-auto ${props.attributes.padding_top} ${props.attributes.padding_bottom} ${props.attributes.style}`}
        >
          <div className={`${props.attributes.column_width}`}>
            <div className={`w-full grid ${props.attributes.grid_width}`}>
               
            </div>
          </div>
        </div>
      </>
    );
  },
});
