import {
	IoAlertCircleSharp,
	IoCheckmarkCircleSharp,
	IoInformationCircle,
} from 'react-icons/io5';

const Message = ({ type = 'error', children }) => {
	return (
		<div className="alert-message" id={type}>
			{type === 'info' ? (
				<IoInformationCircle className="margin-right alert-icon" />
			) : type === 'success' ? (
				<IoCheckmarkCircleSharp className="margin-right alert-icon" />
			) : type === 'error' ? (
				<IoAlertCircleSharp className="margin-right alert-icon" />
			) : null}
			{children}
		</div>
	);
};

export default Message;
