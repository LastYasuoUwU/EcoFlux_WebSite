import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const AboutUs = () => {
  const [membersData, setMembersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setIsLoading(true);
        // Simulate delay for demo purposes - remove in production
        await new Promise((resolve) => setTimeout(resolve, 800));

        const { data, error } = await supabase.from("aboutUs").select();
        if (error) throw error;
        setMembersData(data);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  // return (
  //   <div className="bg-gray-50 py-12">
  //     <div className="max-w-6xl mx-auto px-4">
  //       <div className="text-center mb-16">
  //         <h1 className="text-4xl font-bold text-gray-900 mb-4">
  //           Notre Équipe
  //         </h1>
  //         <p className="text-xl text-gray-600 max-w-3xl mx-auto">
  //           Rencontrez les experts derrière Eco-flux qui sont passionnés par la
  //           création de solutions innovantes pour la gestion de l'énergie et le
  //           développement durable.
  //         </p>
  //       </div>

  //       <div className="grid md:grid-cols-2 gap-12">
  //         {membersData &&
  //           membersData.map((member) => (
  //             <div
  //               key={member.id}
  //               className="bg-white rounded-lg shadow-lg overflow-hidden"
  //             >
  //               <div className="md:flex flex-col md:flex-row">
  //                 <div className="md:flex-shrink-0">
  //                   <img
  //                     className="h-64 w-full object-cover md:w-48 "
  //                     src={member.image}
  //                     alt={member.name}
  //                   />
  //                 </div>
  //                 <div className="p-8">
  //                   <h2 className="text-2xl font-bold text-gray-900">
  //                     {member.name}
  //                   </h2>
  //                   <p className="text-md font-medium text-blue-600">
  //                     {member.role}
  //                   </p>
  //                   <p className="text-md text-blue-500 mb-4">
  //                     {member.roleEn}
  //                   </p>

  //                   <div className="space-y-2 text-gray-700">
  //                     <div className="flex items-center">
  //                       <svg
  //                         className="w-5 h-5 mr-2 text-blue-600"
  //                         fill="none"
  //                         stroke="currentColor"
  //                         viewBox="0 0 24 24"
  //                         xmlns="http://www.w3.org/2000/svg"
  //                       >
  //                         <path
  //                           strokeLinecap="round"
  //                           strokeLinejoin="round"
  //                           strokeWidth="2"
  //                           d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
  //                         ></path>
  //                       </svg>
  //                       <span>{member.phone}</span>
  //                     </div>

  //                     <div className="flex items-center">
  //                       <svg
  //                         className="w-5 h-5 mr-2 text-blue-600"
  //                         fill="none"
  //                         stroke="currentColor"
  //                         viewBox="0 0 24 24"
  //                         xmlns="http://www.w3.org/2000/svg"
  //                       >
  //                         <path
  //                           strokeLinecap="round"
  //                           strokeLinejoin="round"
  //                           strokeWidth="2"
  //                           d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
  //                         ></path>
  //                       </svg>
  //                       <a
  //                         href={`mailto:${member.email}`}
  //                         className="text-blue-600 hover:text-blue-800"
  //                       >
  //                         {member.email}
  //                       </a>
  //                     </div>

  //                     {member.website && (
  //                       <div className="flex items-center">
  //                         <svg
  //                           className="w-5 h-5 mr-2 text-blue-600"
  //                           fill="none"
  //                           stroke="currentColor"
  //                           viewBox="0 0 24 24"
  //                           xmlns="http://www.w3.org/2000/svg"
  //                         >
  //                           <path
  //                             strokeLinecap="round"
  //                             strokeLinejoin="round"
  //                             strokeWidth="2"
  //                             d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
  //                           ></path>
  //                         </svg>
  //                         <a
  //                           href={`https://${member.website}`}
  //                           target="_blank"
  //                           rel="noopener noreferrer"
  //                           className="text-blue-600 hover:text-blue-800"
  //                         >
  //                           {member.website ?? "-"}
  //                         </a>
  //                       </div>
  //                     )}

  //                     <div className="flex items-center">
  //                       <svg
  //                         className="w-5 h-5 mr-2 text-blue-600"
  //                         fill="none"
  //                         stroke="currentColor"
  //                         viewBox="0 0 24 24"
  //                         xmlns="http://www.w3.org/2000/svg"
  //                       >
  //                         <path
  //                           strokeLinecap="round"
  //                           strokeLinejoin="round"
  //                           strokeWidth="2"
  //                           d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
  //                         ></path>
  //                         <path
  //                           strokeLinecap="round"
  //                           strokeLinejoin="round"
  //                           strokeWidth="2"
  //                           d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
  //                         ></path>
  //                       </svg>
  //                       <span>{member.location}</span>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           ))}
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-800 mb-6">
            Notre Équipe
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Rencontrez les experts derrière Eco-flux qui sont passionnés par la
            création de solutions innovantes pour la gestion de l'énergie et le
            développement durable.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {membersData.map((member, index) => (
              <div
                key={member.id}
                className="transform transition duration-500 hover:scale-105 hover:shadow-2xl"
                style={{
                  opacity: 0,
                  animation: `fadeUp 0.6s ease-out ${index * 0.2}s forwards`,
                }}
              >
                <div className="bg-white h-full rounded-xl shadow-xl overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-600"></div>
                  <div className="md:flex">
                    {/* <div className="md:flex-shrink-0 relative overflow-hidden group">
                      <img
                        className="h-64 w-full object-cover md:w-56 transition-transform duration-700 group-hover:scale-110"
                        src={member.image}
                        alt={member.name}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                        <h3 className="text-white text-lg font-bold">
                          {member.name}
                        </h3>
                      </div>
                    </div> */}
                    <div className="w-40 h-40 rounded-full border-4 border-indigo-100 shadow-inner overflow-hidden group relative">
                      <img
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        src={member.image}
                        alt={member.name}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/0 to-indigo-800/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <div className="flex space-x-2">
                          <a
                            href="#"
                            className="w-8 h-8 rounded-full bg-white/30 hover:bg-white/70 flex items-center justify-center transition-colors"
                          >
                            <svg
                              className="w-4 h-4 text-white"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                            </svg>
                          </a>
                          <a
                            href="#"
                            className="w-8 h-8 rounded-full bg-white/30 hover:bg-white/70 flex items-center justify-center transition-colors"
                          >
                            <svg
                              className="w-4 h-4 text-white"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="uppercase tracking-wide text-sm text-indigo-600 font-semibold mb-1">
                        Expert
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-indigo-700 transition-colors">
                        {member.name}
                      </h2>
                      <div className="relative">
                        <p className="text-md font-medium text-blue-600 mb-1">
                          {member.role}
                        </p>
                        <p className="text-md text-blue-500 mb-6 italic">
                          {member.roleEn}
                        </p>
                        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-indigo-300 rounded"></div>
                      </div>

                      <div className="space-y-4 text-gray-700">
                        <div className="flex items-center group">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 mr-3 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              ></path>
                            </svg>
                          </div>
                          <span className="transition-colors group-hover:text-blue-700">
                            {member.phone}
                          </span>
                        </div>

                        <div className="flex items-center group">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 mr-3 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              ></path>
                            </svg>
                          </div>
                          <a
                            href={`mailto:${member.email}`}
                            className="text-blue-600 hover:text-blue-800 transition-all hover:underline"
                          >
                            {member.email}
                          </a>
                        </div>

                        {member.website && (
                          <div className="flex items-center group">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 mr-3 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                ></path>
                              </svg>
                            </div>
                            <a
                              href={`https://${member.website}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 transition-all hover:underline"
                            >
                              {member.website}
                            </a>
                          </div>
                        )}

                        <div className="flex items-center group">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 mr-3 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              ></path>
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              ></path>
                            </svg>
                          </div>
                          <span className="transition-colors group-hover:text-blue-700">
                            {member.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CSS Animation Keyframes */}
      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AboutUs;
