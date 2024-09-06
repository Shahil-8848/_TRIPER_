// // if (email === '' || password === '') {
// //     setError('Please fill in all fields');
// //   } else {
// //     // Call API to login
// //     console.log('Login:', email, password);
// //   }
// // } else {
// //   // Signup logic here
// //   if (email === '' || password === '' || confirmPassword === '') {
// //     setError('Please fill in all fields');
// //   } else if (password !== confirmPassword) {
// //     setError('Passwords do not match');
// //   } else {
// //     // Call API to signup
// //     console.log('Signup:', email, password);
// //   }
// // }
// const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (isLogin) {
//       // Login logic here
//       if (email === '' || password === '') {
//         setError('Please fill in all fields');
//       } else {
//         // Call API to login
//         console.log('Login:', email, password);
//       }
//     } else {
//       // Signup logic here
//       if (email === '' || password === '' || confirmPassword === '') {
//         setError('Please fill in all fields');
//       } else if (password !== confirmPassword) {
//         setError('Passwords do not match');
//       } else {
//         // Call API to signup
//         console.log('Signup:', email, password);
//       }
//     }
//   };

// const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     try {
//       const url = isLogin ? 'http://localhost:3000/api/auth/login' : 'http://localhost:3000/api/auth/register';
//       const body = isLogin
//         ? { email, password }
//         : { email, password, confirmPassword };

//       if (!isLogin && password !== confirmPassword) {
//         setError('Passwords do not match');
//         setIsLoading(false);
//         return;
//       }

//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(body),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();

//       if (isLogin) {
//         localStorage.setItem('token', data.token); // Save token to localStorage
//         alert('Login successful');
//         // Redirect or update UI as needed
//       } else {
//         alert('Signup successful');
//         setIsLogin(true); // Switch to login after successful signup
//       }
//     } catch (error) {
//       setError('An error occurred: ' );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//new upaded one 8/30/2024
