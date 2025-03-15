import TextMatchingActivity from "@/components/TextMatching";
// import "@/styles/globals.css";

export default function TextMatchingActivityPage() {
  return (
    <>
    <style jsx>{`
        body {
          margin: 0; /* Remove default margin */
          padding: 0; /* Remove default padding */
          box-sizing: border-box;
          color: "rgb(142, 202, 230)";
          width: "100vw";
          height: "100vh";
        }
      `}</style>
      <TextMatchingActivity />
    </>
  );
}
