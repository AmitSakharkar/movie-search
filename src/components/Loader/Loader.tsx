import styles from './Loader.module.css';
const Loader: React.FC = () => {
    return (
        <div className={styles.loader} data-testid="loader">
            <span></span>
        </div>
    );
};

export default Loader;
