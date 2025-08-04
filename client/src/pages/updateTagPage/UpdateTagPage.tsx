import React, {FC} from 'react';
import {useParams} from "react-router-dom";
import UpdateTagComponent from "../../components/updateTagComponent/UpdateTagComponent";

const UpdateTagPage: FC = () => {
    const {tagId} = useParams();
    return (
        <div>
            {
                tagId && <UpdateTagComponent tagId={tagId} key={tagId}/>
            }
        </div>
    );
};

export default UpdateTagPage;