import { Link } from "react-router-dom";

export function VendorPreview({ vendor }) {
    if (!vendor) return <p>Loading...</p>;
    console.log('Vendor in VendorPreview:', vendor);
  
    return (
      <article className="preview">
        <header>
          <Link to={`/vendor/${vendor._id || ""}`}>{vendor.name || "Unknown Vendor"}</Link>
        </header>
        <p>Category: {vendor.category || "Not specified"}</p>
        <p>Rating: {vendor.rating || "Not rated yet"}</p>
        <p>Delivery Time: {vendor.deliveryTime || "Unknown"}</p>
        <img
          src={vendor.imageUrl || "https://via.placeholder.com/150"}
          alt={`${vendor.name || "Vendor"} image`}
          style={{ width: "150px", height: "auto" }}
        />
      </article>
    );
  }
  








// import { Link } from "react-router-dom";

// export function VendorPreview({ vendor }) {
//   return (
//     <article className="preview">
//       {/* <pre>{JSON.stringify(vendor, null, 2)}</pre> */}
//       {/* <header>
//                 <Link to={`/vendor/${vendor._id}`}>{vendor.name}</Link>  
//             </header> */}
            
//       <p>Category: {vendor.category}</p>
//       <p>Rating: {vendor.rating}</p>
//       <p>Delivery Time: {vendor.deliveryTime}</p>
//       <img
//         src={vendor.imageUrl}
//         alt={`${vendor.name} image`}
//         style={{ width: "150px", height: "auto" }}
//       />{" "}
   
//       <p>
//         Rating: <span>{vendor.rating} </span>
//       </p>
//       {/* {vendor.owner && (
//         <p>
//           Owner: <span>{vendor.owner.fullname}</span>
//         </p>
//       )} */}
//     </article>
//   );
// }
