import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  image: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Real-time Transcription & Translation',
    image: 'https://cdn-icons-png.flaticon.com/512/3269/3269817.png',
    description: (
      <>
        Get live transcription of your system's audio and have it translated into multiple languages instantly. Perfect for meetings, online classes, and more.
      </>
    ),
  },
  {
    title: 'Cross-Platform Compatibility',
    image: 'https://cdn-icons-png.flaticon.com/512/2000/2000523.png',
    description: (
      <>
        Our application is built with Electron, allowing it to run natively on Windows, macOS, and Linux. Enjoy a consistent experience across all your devices.
      </>
    ),
  },
  {
    title: 'Powered by a Modern Stack',
    image: 'https://cdn-icons-png.flaticon.com/512/2083/2083213.png',
    description: (
      <>
        Leveraging Angular for the frontend, NestJS for the backend, and Azure Speech Services for AI-powered transcription, ensuring a robust and reliable experience.
      </>
    ),
  },
];

function Feature({title, image, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className="text--center">
          <img src={image} className={styles.featureSvg} alt={title} />
        </div>
        <div className="text--center padding-horiz--md">
          <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
          <p className={styles.featureDescription}>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
