import Card from '@components/ui/container/Card';
import Centered from '@components/ui/container/Centered';
import Column from '@components/ui/container/Column';
import Container from '@components/ui/container/Container';
import Modal from '@components/ui/container/Modal';
import Row from '@components/ui/container/Row';
import { faXmarkCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type Props = {
    children: React.ReactNode;
    onClose: () => void;
    label: string;
    icon: IconDefinition;
    footer?: React.ReactNode;
    className?: string;
    index?: string;
    gap?: string;
};

const ModalContainer: React.FC<Props> = ({
    children,
    label,
    icon,
    onClose,
    footer,
    className,
    index = '50',
    gap = '6',
}) => {
    const getCardClasses = () => {
        const baseClasses = 'relative mx-auto px-6 py-4';

        const hasWidthClass = className?.match(/(?:^|\s)(?:\S+:)*w-[^\s]+/);
        const widthClass = hasWidthClass ? '' : ' w-[800px]';

        const hasMaxHeightClass = className?.match(/(?:^|\s)(?:\S+:)*max-h-[^\s]+/);
        const maxHeightClass = hasMaxHeightClass ? '' : ' max-h-[90vh]';

        return `${baseClasses}${widthClass}${maxHeightClass} ${className || ''}`.trim();
    };

    return (
        <Modal index={index}>
            <Card className={getCardClasses()}>
                <Column gap={gap}>
                    <header className="flex items-center justify-between">
                        <Row>
                            <Centered className={'w-10 h-10 bg-blue-200 rounded-lg'}>
                                <FontAwesomeIcon icon={icon} className={'w-5 h-5 text-blue-600'} />
                            </Centered>
                            <h3 className="text-lg font-semibold text-gray-900">{label}</h3>
                        </Row>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600">
                            <Centered>
                                <FontAwesomeIcon icon={faXmarkCircle} className={'h-6 w-6'} />
                            </Centered>
                        </button>
                    </header>
                    <Container className={'px-2'}>{children}</Container>
                    {footer && <footer className="pt-4 border-t border-gray-200">{footer}</footer>}
                </Column>
            </Card>
        </Modal>
    );
};

export default ModalContainer;
