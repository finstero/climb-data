// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';

// // material ui
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Button from '@material-ui/core/Button';

// function Alert({isOpen}) {

//     // const openStatus = useSelector(store => store.alert?.status);

//     // const [open, setOpen] = useState(openStatus);

//     const handleClickOpen = () => {
//       setOpen(true);
//     };
  
//     const handleClose = () => {
//       setOpen(false);
//     };
  
//   return (
//     <div>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             Let Google help apps determine location. This means sending anonymous location data to
//             Google, even when no apps are running.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Disagree
//           </Button>
//           <Button onClick={handleClose} color="primary" autoFocus>
//             Agree
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

// export default Alert;