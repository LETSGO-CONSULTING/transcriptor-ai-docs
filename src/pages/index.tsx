import React, {JSX} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import TranslationSvg from '@site/static/img/imagenTranslation.svg';
import styles from './index.module.css';

function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <header className={clsx('hero', styles.heroClean)}>
            <div className="container">
                <div className={styles.heroFlexContainer}>

                    <div className={styles.heroTextSide}>
                        <h1 className={styles.heroTitleBig}>
                            {siteConfig.title}
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Seamless real-time speech translation powered by scalable AI architecture.
                            Break language barriers instantly.
                        </p>
                        <div className={styles.buttonsContainer}>
                            <Link
                                className="button button--primary button--lg"
                                to="/docs/introduction">
                                Get Started
                            </Link>
                            <Link
                                className="button button--outline button--primary button--lg"
                                to="/docs/architecture/system-design">
                                View Architecture
                            </Link>
                        </div>
                    </div>

                    <div className={styles.heroImageSide}>
                        <TranslationSvg className={styles.heroFloatingImage} role="img"/>
                    </div>

                </div>
            </div>
        </header>
    );
}

function UseCasesSection() {
    return (
        <section className={styles.useCasesSection}>
            <div className="container">
                <h2 className={styles.sectionTitle}>Designed for Every Scenario</h2>
                <div className={styles.useCasesGrid}>
                    
                    <div className={styles.useCaseItem}>
                        <div className={styles.useCaseIconWrapper}>💼</div>
                        <h3 className={styles.useCaseTitle}>Remote Meetings</h3>
                        <p className={styles.useCaseDesc}>
                            Understand international colleagues on Zoom, Teams, or Google Meet without missing a beat.
                        </p>
                    </div>

                    <div className={styles.useCaseItem}>
                        <div className={styles.useCaseIconWrapper}>🎓</div>
                        <h3 className={styles.useCaseTitle}>Online Learning</h3>
                        <p className={styles.useCaseDesc}>
                            Watch tutorials, lectures, or courses in any language and get instant subtitles in your native tongue.
                        </p>
                    </div>

                    <div className={styles.useCaseItem}>
                        <div className={styles.useCaseIconWrapper}>👂</div>
                        <h3 className={styles.useCaseTitle}>Accessibility</h3>
                        <p className={styles.useCaseDesc}>
                            Empower users with hearing impairments to participate fully in conversations through live text.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}

function ExploreDocsSection() {
    return (
        <section className={styles.exploreSection}>
            <div className="container">
                <h2 className={styles.sectionTitle}>Explore the Platform from the Docs</h2>
                <div className={styles.cardsGrid}>
                    
                    <Link to="/docs/architecture/system-design" className={styles.docCard}>
                        <div className={styles.cardIcon}>🏗️</div>
                        <h3 className={styles.cardTitle}>Architecture</h3>
                        <p className={styles.cardDescription}>
                            Dive into the high-level system design, component interactions, and tech stack choices.
                        </p>
                    </Link>

                    <Link to="/docs/backend/app-module" className={styles.docCard}>
                        <div className={styles.cardIcon}>⚙️</div>
                        <h3 className={styles.cardTitle}>Backend</h3>
                        <p className={styles.cardDescription}>
                            Explore the NestJS modules, API endpoints, and real-time WebSocket services.
                        </p>
                    </Link>

                    <Link to="/docs/frontend/architecture" className={styles.docCard}>
                        <div className={styles.cardIcon}>💻</div>
                        <h3 className={styles.cardTitle}>Frontend</h3>
                        <p className={styles.cardDescription}>
                            Learn about the Electron + Angular hybrid app, audio capture, and UI components.
                        </p>
                    </Link>

                    <Link to="/docs/devops/deployment" className={styles.docCard}>
                        <div className={styles.cardIcon}>🚀</div>
                        <h3 className={styles.cardTitle}>DevOps</h3>
                        <p className={styles.cardDescription}>
                            Guides for building, deploying, and distributing the application across platforms.
                        </p>
                    </Link>

                </div>
            </div>
        </section>
    );
}

export default function Home(): JSX.Element {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout
            title={`Home`}
            description="Real-time live translation platform">
            <HomepageHeader />
            <main>
                <HomepageFeatures />
                <UseCasesSection />
                <ExploreDocsSection />
            </main>
        </Layout>
    );
}
