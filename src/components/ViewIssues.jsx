// import { useState } from "react";
// import { NavLink } from "react-router-dom";
// import UnresolvedIssues from "./issues/UnresolvedIssues";
// import ResolveIssueForm from "./issues/NotificationModal"

// export default function ViewIssues() {
//   const [issuesStatus, setIssuesStatus] = useState();

//   function openResolvedIssues() {
//     setIssuesStatus("resolved");
//   }

//   function openUnresolvedIssues() {
//     setIssuesStatus("unresolved");
//   }

//   function handleResolveIssue(){
//     setIssuesStatus("resolving")
//   }

//   let content = "";

//   if (issuesStatus === "resolved") {
//     content = <p>No issue has been soughted</p>;
//   } else if (issuesStatus === "resolving") {
//     content =  <ResolveIssueForm />;
//   } else if (issuesStatus === "unresolved"){
//     content =  <UnresolvedIssues handleResolveIssue={handleResolveIssue}/>
//   } else{
//     content = ""
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6 rounded-lg shadow md:ml-5 min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 md:w-5xl">
//       <div className="flex flex-row md:gap-6 gap-3  justify-between">
//         <div className="md:w-2xl py-6 px-1 md:px-2 bg-gray-200 rounded">
//           <h3 className="text-center">2 resolved issues</h3>
//           <p className="text-center">
//             <NavLink onClick={openResolvedIssues}>View details</NavLink>
//           </p>
//         </div>
//         <div className="md:w-xl py-6 px-1 md:px-2 bg-gray-200 rounded">
//           <h3 className="text-center">4 unresolved issues</h3>
//           <p className="text-center">
//             <NavLink onClick={openUnresolvedIssues}>View details</NavLink>
//           </p>
//         </div>
//       </div>

//       {content}
//     </div>
//   );
// }
