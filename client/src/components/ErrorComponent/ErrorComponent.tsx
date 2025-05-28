import React, {FC} from 'react';
import styles from './ErrorComponent.module.css'

const ErrorComponent: FC = () => {
    return (
        <div className={styles.main}>
            <h1>Фігня якась</h1>
          <p>Друже, або ти прав не маєш, або шось не ото натицяв</p>
        </div>
    );
};

export default ErrorComponent;