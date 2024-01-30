import React, { useState, useRef, useEffect } from "react";
import { MdAutorenew } from "react-icons/md";
import { MdOutlineFileDownload } from "react-icons/md";

const Home = () => {
  // State variables for managing color values
  const [selectedPath, setSelectedPath] = useState(null);
  const [currentColor, setCurrentColor] = useState("#000000");
  const [backgroundPathColor, setBackgroundPathColor] = useState("#F89D21");
  const [upperOuterQuadColor, setUpperOuterQuadColor] = useState("#FFFFFF");
  const [upperInnerQuadColor, setUpperInnerQuadColor] = useState("#000000");
  const [lowerOuterQuadColor, setLowerOuterQuadColor] = useState("#000000");
  const [lowerInnerQuadColor, setLowerInnerQuadColor] = useState("#FFFFFF");

  // State variables for color picker values
  const [backgroundPathPickerColor, setBackgroundPathPickerColor] =
    useState("#F89D21");
  const [otherPathsPickerColor, setOtherPathsPickerColor] = useState("#000000");

  // Ref for accessing the SVG element
  const svgRef = useRef(null);

  // Event handler for changing background path color
  const handleBackgroundPathColorChange = (color) => {
    setBackgroundPathPickerColor(color);
    setBackgroundPathColor(color);
  };

  // Event handler for changing other paths color
  const handleOtherPathsColorChange = (color) => {
    setOtherPathsPickerColor(color);
    if (selectedPath) {
      setCurrentColor(color);
      updateColor(selectedPath, color);
    }
  };

  // Event handler for changing color
  const handleColorChange = (color) => {
    if (selectedPath) {
      setCurrentColor(color);
      updateColor(selectedPath, color);
    } else {
      setCurrentColor(color);
      setBackgroundPathColor(color);
    }
  };

  // Event handler for selecting a path
  const handlePathSelect = (path) => {
    setSelectedPath(path);
    setCurrentColor(
      // Determine the initial color based on the selected path
      path === "backgroundPathColor"
        ? backgroundPathColor
        : path === "upperOuterQuad"
        ? upperOuterQuadColor
        : path === "upperInnerQuad"
        ? upperInnerQuadColor
        : path === "lowerOuterQuad"
        ? lowerOuterQuadColor
        : path === "lowerInnerQuad"
        ? lowerInnerQuadColor
        : "#000000"
    );
  };

  // Function to update color based on the selected path
  const updateColor = (path, color) => {
    switch (path) {
      case "backgroundPathColor":
        setBackgroundPathColor(color);
        break;
      case "upperOuterQuad":
        setUpperOuterQuadColor(color);
        break;
      case "upperInnerQuad":
        setUpperInnerQuadColor(color);
        break;
      case "lowerOuterQuad":
        setLowerOuterQuadColor(color);
        break;
      case "lowerInnerQuad":
        setLowerInnerQuadColor(color);
        break;
      default:
        break;
    }
  };

  // State variable for storing a random color
  const [randomColor, setRandomColor] = useState(null);

  // Function to generate a random hex color code
  function generateRandomColor() {
    const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return color;
  }

  // Function to refresh the color palette with random colors
  function refreshPalette() {
    const bg_color = generateRandomColor();
    const upper_outer = generateRandomColor();
    const upper_inner = generateRandomColor();
    const lower_outer = generateRandomColor();
    const lower_inner = generateRandomColor();
    setUpperOuterQuadColor(outer_upper);
    setUpperInnerQuadColor(inner_upper);
    setLowerOuterQuadColor(outer_lower);
    setLowerInnerQuadColor(inner_lower);
    setBackgroundPathColor(background_colour);
  }

  // Function to download the SVG as a PNG file
  const downloadPng = () => {
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "ethMumbaiLogo.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgData);
  };

  // Render the component
  return (
    <>
      {/* Text indicating color selection */}
      <div className="text-zinc-400 relative flex items-center justify-center top-[25vh] text-center text-[2.2vh] text-center font-['Yusei Magic']">
        Tap on a colour to select it
      </div>

      {/* SVG for displaying color paths */}
      <svg
        ref={svgRef}
        className="border cursor-pointer relative mx-auto relative top-[30vh] rounded-md aspect-auto border-white/10 w-[300px] 2xl:w-[380px]"
        viewBox="0 0 2400 2400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background */}
        <rect width="2400" height="2400" fill={backgroundPathColor} />

        {/* Upper Outer Quad */}
        <path
          d="M1185.6 294.398L1758 1216L1196.4 1548.4L642 1210L1185.6 294.398Z"
          fill={
            selectedPath === "upperOuterQuad"
              ? currentColor
              : upperOuterQuadColor
          }
          onClick={() => handlePathSelect("upperOuterQuad")}
        />

        {/* Upper Inner Quad */}
        <path
          d="M1196.41 2105.2L1755.61 1319.2L1198.81 1649.2L645.609 1327.6L1196.41 2105.2Z"
          fill={
            selectedPath === "upperInnerQuad"
              ? currentColor
              : upperInnerQuadColor
          }
          onClick={() => handlePathSelect("upperInnerQuad")}
        />

        {/* Lower Outer Quad */}
        <path
          d="M1186.79 456.398L1607.99 1166.8L1191.59 1428.4L788.391 1166.8L1186.79 456.398Z"
          fill={
            selectedPath === "lowerOuterQuad"
              ? currentColor
              : lowerOuterQuadColor
          }
          onClick={() => handlePathSelect("lowerOuterQuad")}
        />

        {/* Lower Inner Quad */}
        <path
          d="M1198.8 1992.4L1486.8 1572.4L1205.75 1750L928.805 1603.6L1198.8 1992.4Z"
          fill={
            selectedPath === "lowerInnerQuad"
              ? currentColor
              : lowerInnerQuadColor
          }
          onClick={() => handlePathSelect("lowerInnerQuad")}
        />
      </svg>

      {/* Nimbu Mirchi image */}
      <div className="w-[2vh] h-[1.5vh] top-[2vh] right-[20vh] absolute opacity-20 justify-center items-center inline-flex">
        <img
          className="w-[5vh] rotate-[11.24deg] opacity-90"
          src="../assets/images/nimbu_mirchi.png"
          alt="nimbu mirchi here"
        />
      </div>

      {/* Color pickers and buttons */}
      <div className="relative right-[-130vh] top-[-15vh] w-11 flex-col justify-start items-start gap-5 inline-flex">
        {/* Color pickers for different paths */}
        <input
          type="color"
          id="upperOuterQuadColorPicker"
          value={upperOuterQuadColor}
          style={{ backgroundColor: upperOuterQuadColor }}
          onChange={(e) => handleOtherPathsColorChange(e.target.value)}
          className="w-11 h-11 p-2.5 rounded-[1vh] border-1 border-white border-opacity-30 transition-transform transform cursor-pointer hover:scale-120"
        />

        <input
          type="color"
          id="upperInnerQuadColorPicker"
          value={upperInnerQuadColor}
          style={{ backgroundColor: upperInnerQuadColor }}
          onChange={(e) => handleOtherPathsColorChange(e.target.value)}
          className="w-11 h-11 p-2.5 rounded-[1vh] border-1 border-white border-opacity-30 transition-transform transform cursor-pointer hover:scale-120"
        />

        <input
          type="color"
          id="lowerOuterQuadColorPicker"
          value={lowerOuterQuadColor}
          style={{ backgroundColor: lowerOuterQuadColor }}
          onChange={(e) => handleOtherPathsColorChange(e.target.value)}
          className="w-11 h-11 p-2.5 rounded-[1vh] border-1 border-white border-opacity-30 transition-transform transform cursor-pointer hover:scale-120"
        />

        <input
          type="color"
          id="lowerInnerQuadColorPicker"
          value={lowerInnerQuadColor}
          style={{ backgroundColor: lowerInnerQuadColor }}
          onChange={(e) => handleOtherPathsColorChange(e.target.value)}
          className="w-11 h-11 p-2.5 rounded-[1vh] border-1 border-white border-opacity-30 transition-transform transform cursor-pointer hover:scale-120"
        />

        {/* Button to refresh the color palette */}
        <div
          data-tooltip-target="tooltip-refresh"
          className="p-2.5 bg-neutral-800 rounded-[1vh] border border-white border-opacity-30 justify-center items-center gap-2.5 inline-flex transition-transform transform cursor-pointer hover:scale-125 bg-violet"
        >
          <MdAutorenew className="w-6 h-6" onClick={refreshPalette} />
        </div>

        {/* Button to download the SVG as PNG */}
        <div
          className="p-2.5 bg-neutral-800 rounded-[1vh] border border-white border-opacity-30 justify-center items-center gap-2.5 inline-flex transition-transform transform cursor-pointer hover:scale-125 bg-violet"
          onClick={downloadPng}
        >
          <MdOutlineFileDownload className="w-6 h-6" />
        </div>

        {/* Additional content (empty in this case) */}
        <div className="flex-col justify-start items-center flex"></div>
      </div>
    </>
  );
};

export default Home;
