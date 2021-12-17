import Swal from 'sweetalert2'
var axios = require('axios');
var ServerURL = "http://localhost:5000"


const getData = async(url)=>{
    try
    {
        var response = await fetch(`${ServerURL}/${url}`,{

            method: "GET",
            //mode: "cors",
            headers:{
                "Authorization":localStorage.getItem('token'),
                "Content-type":"application/json;charset=utf-8",
            },
        });
        const result = await response.json();
         //alert(JSON.stringify(result))
        if(result=='expire')
        {
            Swal.fire({
                title: 'Session Expire Please Login Again',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Login Again',
                cancelButtonText: 'Cancel'

            }).then((result) => {
                if(result.isConfirmed) {
                   window.location.href="http://localhost:3000/adminlogin"
                }
                else if(result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire(
                        'Cancelled',
                        'Your imaginary file is safe :)',
                        'error'
                    )
                }

            })
        }
        return result; 
    }
    catch(e)
    {
        return null;
    }

};

const postData = async(url,body)=>{
    try
    {
    var response = await fetch(`${ServerURL}/${url}`,{

        method: "POST",
        mode: "cors",
        headers:{
           "Authorization":localStorage.getItem('token'),
            "Content-type":"application/json;charset=utf-8",
        },
        body: JSON.stringify(body),
    });

    const result = await response.json();
        //alert(JSON.stringify(result))
        if(result=='expire')
        {
            alert("Session Expire")
        }
    return result;
    }
    catch(e)
    {
        return null
    }
} 



const postDataAndImage = async(url, formData, config)=>{
    try
    {
    const response = await axios.post(`${ServerURL}/${url}`,formData,config);
    const result = response.data
    return result
    }
    catch(e)
    {
        return null
    }
} 

export {postDataAndImage, ServerURL, getData, postData}
