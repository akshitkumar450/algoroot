import Loader from "@/components/loader";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import Table from "@/components/table";
import { getPostsDataRequest } from "@/redux/slices/details";
import { wrapper } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Details() {
  const { data, loading } = useSelector((state) => state.detailsReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    const user = sessionStorage.getItem('user')
   if(!user)  window.location.replace('/')
    else if(user)
    dispatch(getPostsDataRequest());
  }, []);
  
  return (
    <div className="min-w-max">
      <Navbar />
      <section className="flex min-w-max">
        <div className="flex-[0.2] bg-gray-500 ">
          <Sidebar/>
        </div>
        <div  className="flex-[0.8]">

      {loading ? <Loader /> : <Table data={data || []} />}
        </div>

      </section>
    </div>
  );
}

export default Details;

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) =>
//     ({ req, res, ...etc }) => {
//       store.dispatch(getPostsDataRequest());
//       return {};
//     }
// );

// Details.getInitialProps = wrapper.getInitialPageProps(store => ({pathname, req, res}) => {
//   store.dispatch(getPostsDataRequest());
// });
