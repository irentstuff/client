import React, { useEffect, useState } from 'react';
import { CognitoIdentityProviderClient, ListUsersCommand } from '@aws-sdk/client-cognito-identity-provider';
import { Auth } from 'aws-amplify';
// import AWS from 'aws-sdk';

export const ListUsers = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const currentUser = await Auth.currentAuthenticatedUser();
          setUser(currentUser);
        } catch (err) {
          console.error('Error fetching user:', err);
          setError(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUser();
    }, []);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    return (
      <div>
        <h1>User Info</h1>
        {user ? (
          <p>Username: {user.username}</p>
        ) : (
          <p>No user signed in.</p>
        )}
      </div>
    );
  };



// export const ListUsers = () => {
//     const [users, setUsers] = useState([]);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);

//     // Replace with your user pool ID and region
//     const userPoolId = 'ap-southeast-1_hOVDACD9D';
//     const region = 'ap-southeast-1';
//     const accessKeyId = 'ASIATCKAQ5QIDIFN7W5X';
//     const secretAccessKey = 'KJ/pZzMRJNJtRCXNaJ8NhvIiAr9r6yoTW6PuC4DX';
//     const sessionToken= 'IQoJb3JpZ2luX2VjEO7//////////wEaDmFwLXNvdXRoZWFzdC0xIkgwRgIhAK0bKFZOFkPiVamZCkr14lyzocD31Pdo+63c1k8Q1GcEAiEAprg7N1OWVJlIw6x/rE6vMe+m0RCIEfCPPjhIJ1RqLB0q4wIIFxAAGgwyMTExMjU1OTUxNTIiDKe2CR4cZrL12MlliSrAAnIDsNW6UOIUy0OpQ2Wi+E2feb9N3EacmvGhbcUwme7jgsdFtk2eYPuZDCvZ6/xiuWYQddkif2E7eWDLoKenB4pLB4bhxO4U0cRHIgRLnDMe8ohO6UMFANSdA1+L+dXmEByMHEYmAb46zxuNeRpvp7LApqJjZdqANgf/TS7kLSzLyKFO/lxjjCPDS2y2eovWblplnPrpugj3fJdXafmYziri9zv9CSXH8H27VhTQ33sYxi0/yuzkMDRHvH5NQuzw0SYfK11WZHLrQTSE1FnCLJmzzhZXhNM9FhsY5HoLYYyzvaIx+xHxKiDtV+UH469qenVwWQGKXQA223Gl7RPcXQ1J9Jgkuk4lZmb091EOnjeFfw7AgrxMDOiReJa8fWw5GeolSpxjahA02KLMdb4wF6rcqxuWrs6BHVv1+ubMWT/cMLOP7LYGOqYBFGVTutnqfeA+2MSx3X6Y+mJ5DFouDXdEcjbrqg9fjddM8pnaGFx4+xZIHmeT1k9MotE1ibXf6MEVQQzHXVXCx8fHShn9YmCalTLtiFpl81g/ln8R2mTkSGhZN5ZQbfPCG1Cx2Lmc+3ia6MLzljeRX8Hgm+URKw2fHdslsksNbi3ob8KV+I4aSSJyQDP+I2FzUgO+68SoS1vBcN1FIbX4fMdyIHAlRg=='

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 // Initialize AWS Cognito client
//                 const client = new CognitoIdentityProviderClient({
//                     region: region,
//                     credentials: {
//                         accessKeyId: accessKeyId,
//                         secretAccessKey: secretAccessKey,
//                         sessionToken: sessionToken
//                     }
//                 });

//                 const command = new ListUsersCommand({
//                     UserPoolId: userPoolId ,
//                     Limit: 60 
//                 });

//                 const data = await client.send(command);

//                 console.log('Initial response:', data);

//                 setUsers(data.Users || []);
//             } catch (err) {
//                 console.error('Error fetching users:', err);
//                 setError(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUsers();
//     }, [region, userPoolId, accessKeyId, secretAccessKey]);

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error.message}</p>;

//     return (
//         <div>
//             <h1>Users List</h1>
//             <ul>
//                 {users.length > 0 ? (
//                     users.map(user => (
//                         <li key={user.Username}>{user.Username}</li>
//                     ))
//                 ) : (
//                     <p>No users found.</p>
//                 )}
//             </ul>
//         </div>
//     );
// };



/////////
// AWS.config.update({
//     accessKeyId: 'ASIATCKAQ5QIHGGJABOI',
//     secretAccessKey: 'HpIclnqZQI5vNS3cI08VhZicPQru4m8RfH+19Xgh',
//     region: 'ap-southeast-1', 
//     credentials: new AWS.CognitoIdentityCredentials({
//         IdentityPoolId: 'ap-southeast-1:226fd2d7-5b6b-413d-8dba-8e238e0d5d19', 
//     }),
// });

// AWS.config.update({
//     region: 'ap-southeast-1', // replace with your region
//     credentials: new AWS.Credentials('ASIATCKAQ5QIHGGJABOI', 'HpIclnqZQI5vNS3cI08VhZicPQru4m8RfH+19Xgh')
// });

// const cognitoISP = new AWS.CognitoIdentityServiceProvider();

// export async function fetchUsers(userPoolId, limit) {
//     const params = {
//         UserPoolId: userPoolId,
//         Limit: limit,
//     };

//     try {
//         const data = await cognitoISP.listUsers(params);
//         console.log('Initial response:', data); // Check the response for PaginationToken
//         return data;
//     } catch (err) {
//         console.error('Error fetching users:', err);
//         throw err;
//     }
// }


// export async function fetchAllUsers(userPoolId) {
//     let allUsers = [];
//     let paginationToken = null;
//     const limit = 60; // Maximum allowed limit

//     do {
//         const params = {
//             UserPoolId: userPoolId,
//             Limit: limit,
//             PaginationToken: paginationToken,
//         };

//         try {
//             const data = await cognitoISP.listUsers(params).promise();
//             console.log('Data', data);
//             allUsers = allUsers.concat(data.Users); // Accumulate users
//             paginationToken = data.PaginationToken; // Token for the next page of results
//         } catch (err) {
//             console.error('Error fetching users:', err);
//             throw err;
//         }
//     } while (paginationToken); // Loop until all pages are fetched

//     return allUsers;
// }

// Example usage
// const userPoolId = 'ap-southeast-1_hOVDACD9D';
// fetchAllUsers(userPoolId).then(users => {
//     console.log('All users:', users);
// }).catch(err => {
//     console.error('Failed to fetch users:', err);
// }); 
