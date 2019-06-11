export default {
  type: "AdaptiveCard",
  body: [
    {
      type: "Container",
      items: [
        {
          type: "TextBlock",
          size: "Medium",
          weight: "Bolder",
          text: "Please select the avaiable laptops"
        },
        {
          type: "ImageSet",
          images: [
            {
              type: "Image",
              horizontalAlignment: "Center",
              height: "stretch",
              url:
                "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE2x0K8?ver=f836&q=90&m=6&h=270&w=270&b=%23FFFFFFFF&o=f&aim=true",
              size: "Medium"
            },
            {
              type: "Image",
              horizontalAlignment: "Center",
              height: "stretch",
              url:
                "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE2wY7i?ver=79a0&q=90&m=6&h=270&w=270&b=%23FFFFFFFF&o=f&aim=true",
              size: "Medium"
            }
          ]
        }
      ]
    },
    {
      type: "Container",
      items: [
        {
          type: "Media",
          poster: "",
          sources: [
            {
              mimeType: "video/mp4",
              url: "https://adaptivecards.io/content/poster-video.png"
            }
          ]
        }
      ]
    },
    {
      type: "Container",
      items: [
        {
          type: "TextBlock",
          color: "Accent",
          text:
            "These are the **[new generation systems](https://www.microsoft.com/en-us/store/b/surface?icid=CNavDevicesSurface)** which will help you to multi-task your applications and run your multimedia and do some high graphics gaming.",
          wrap: true
        },
        {
          type: "TextBlock",
          weight: "Bolder",
          color: "Attention",
          text: "What color do you want?"
        },
        {
          type: "Input.ChoiceSet",
          id: "CompactSelectVal",
          value: "1",
          choices: [
            {
              title: "Black",
              value: "1"
            },
            {
              title: "Red",
              value: "2"
            },
            {
              title: "Blue",
              value: "3"
            }
          ]
        },
        {
          type: "TextBlock",
          weight: "Bolder",
          color: "Attention",
          text: "Which RAM/Memory variant are you looking for?"
        },
        {
          type: "Input.ChoiceSet",
          id: "MemSelectVal",
          choices: [
            {
              title: "8 GB",
              value: "1"
            },
            {
              title: "16 GB",
              value: "2"
            }
          ],
          style: "expanded"
        },
        {
          type: "TextBlock",
          weight: "Bolder",
          color: "Attention",
          text: "What purpose are you looking for?"
        },
        {
          type: "Input.ChoiceSet",
          id: "MultiSelectVal",
          isMultiSelect: true,
          value: "1,3",
          choices: [
            {
              title: "Gaming",
              value: "1"
            },
            {
              title: "Music",
              value: "2"
            },
            {
              title: "Work",
              value: "3"
            }
          ]
        },
        {
          type: "Input.Text",
          id: "SimpleVal",
          placeholder: "Please tell us the purpose..."
        },
        {
          type: "FactSet",
          facts: [
            {
              title: "Screen:",
              value:
                "[Corning Gorilla Glass](https://www.corning.com/gorillaglass/worldwide/en.html)"
            },
            {
              title: "Wireless:",
              value: "Latest 4.0 Bluetooth and WLAN"
            },
            {
              title: "Keyboard:",
              value: "Chocolate Keyboard with Backlight"
            },
            {
              title: "Material:",
              value: "Aluminium Body"
            }
          ]
        }
      ]
    }
  ],
  actions: [
    {
      type: "Action.OpenUrl",
      id: "dueDate",
      title: "Surface Laptop 2",
      iconUrl:
        "",
      url:
        "https://www.microsoft.com/en-us/p/surface-studio-2/8SBJXM0M58T4?ICID=SurfaceDept_Nav5_SurfaceFamily_100218&activetab=pivot%3aoverviewtab"
    },
    {
      type: "Action.OpenUrl",
      id: "surfaceStudio2",
      title: "Surface Studio 2",
      iconUrl:
        "",
      url:
        "https://www.microsoft.com/en-us/p/surface-studio-2/8SBJXM0M58T4?ICID=SurfaceDept_Nav5_SurfaceFamily_100218&activetab=pivot%3aoverviewtab"
    },
    {
      type: "Action.Submit",
      id: "submit",
      title: "Submit"
    }
  ],
  $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
  version: "1.0"
};
