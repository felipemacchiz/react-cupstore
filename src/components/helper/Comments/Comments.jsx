import React from 'react';
import Comment from '../Comment/Comment';
import styles from './Comments.module.css';

const Comments = ({ comments }) => {
	return (
		<div className={styles.commentsContainer}>
			{comments?.map(({ author, email, comment }, index) => (
				<Comment key={index} author={author} email={email} comment={comment} />
			))}
		</div>
	);
}

export default Comments;