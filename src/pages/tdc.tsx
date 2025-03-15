import TDC from "@/components/tdc";
// import "@/styles/globals.css";
export default function TDCPage() {
    return (
        <>
      <style jsx>{`
        body {
          margin: 0; /* Remove default margin */
          padding: 0; /* Remove default padding */
          box-sizing: border-box;
        }
      `}</style>
            <TDC />
        </>
    );
}
