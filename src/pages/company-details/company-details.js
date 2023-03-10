import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import './company-details.css'
import DataLayout from "../../components/dataLayout/DataLayout";
import {AuthContext} from "../../context/AuthContext";
import createDateString from "../../helpers/createDateString/CreateDateString";

function CompanyDetails() {

    let { dateNow } = useParams();
    const [lastSearch, setLastSearch] = useState([]);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        setLastSearch(JSON.parse(localStorage.getItem("lastSearchCompany")));
        console.log(lastSearch);
    }, [dateNow]);

    const userFilter = lastSearch.filter((post) => {
        return post.User === user.id;
    });
    console.log(userFilter)

    const currentPost = userFilter.find((post) => {
        return post.Date === parseInt(dateNow);
    });
    console.log(dateNow);

    return (
        <div className='carpithians company-details'>
            <p className='heading'>The results are from {currentPost && createDateString(currentPost.Date)}</p>
            <DataLayout
                companyOverview={currentPost}
                isAuth={true}
                error={false}
                companyId={true}
            />
        </div>
    )
}

export default CompanyDetails;