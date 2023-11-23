import React from 'react';
import styles from '../Comments/Comments.module.css';
import { FaUserCircle } from 'react-icons/fa';

const Comment = ({ author, email, comment }) => {
	return (
		<div className={styles.comment}>
			<FaUserCircle className={styles.userIcon} />
			<p className={styles.commentText}>{comment}</p>
		</div>
	);
}

export default Comment;