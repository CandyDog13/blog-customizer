import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Article } from 'components/article';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';
import { StoryDecorator } from '../story-decorator';
import { Text } from '../text';
import { FormEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import {
	FontFamiliesClasses,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type TArticleParamsFormProps = {
	setSettings: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setSettings }: TArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState<boolean>(false); // открытие/закрытие формы

	const containerFormRef = useRef<HTMLDivElement | null>(null);

	const [dataFormInfo, setDataFormInfo] =
		useState<ArticleStateType>(defaultArticleState);

	useEffect(() => {
		document.addEventListener('mousedown', handleCloseMenu);
		return () => {
			document.removeEventListener('mousedown', handleCloseMenu);
		};
	}, [isFormOpen]);

	function handleCloseMenu(event: Event) {
		if (
			isFormOpen &&
			!containerFormRef.current?.contains(event.target as Node)
		) {
			setIsFormOpen(false);
		}
	}

	function handleSetDataFormInfo(option: keyof ArticleStateType) {
		return (value: OptionType): void => {
			setDataFormInfo({ ...dataFormInfo, [option]: value });
		};
	}

	function handleSetDefault(event: FormEvent) {
		event.preventDefault();
		setDataFormInfo(defaultArticleState);
		setSettings(defaultArticleState);
	}

	function handleSetDataInfo(event: FormEvent) {
		event.preventDefault();
		setSettings(dataFormInfo);
	}

	return (
		<div ref={containerFormRef}>
			<ArrowButton
				isOpen={isFormOpen}
				OnClick={() => {
					setIsFormOpen(!isFormOpen);
				}}
			/>
			<aside
				className={clsx(styles.container, isFormOpen && styles.container_open)}>
				<form
					className={styles.form}
					onReset={handleSetDefault}
					onSubmit={handleSetDataInfo}>
					<Text size={31} weight={800} uppercase={true}>
						задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={dataFormInfo.fontFamilyOption}
						title='шрифт'
						onChange={handleSetDataFormInfo('fontFamilyOption')}
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={dataFormInfo.fontSizeOption}
						title='размер шрифта'
						onChange={handleSetDataFormInfo('fontSizeOption')}
					/>

					<Select
						options={fontColors}
						selected={dataFormInfo.fontColor}
						title='цвет шрифта'
						onChange={handleSetDataFormInfo('fontColor')}
					/>
					<Separator />

					<Select
						options={backgroundColors}
						selected={dataFormInfo.backgroundColor}
						title='цвет фона'
						onChange={handleSetDataFormInfo('backgroundColor')}
					/>

					<Select
						options={contentWidthArr}
						selected={dataFormInfo.contentWidth}
						title='ширина контента'
						onChange={handleSetDataFormInfo('contentWidth')}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
