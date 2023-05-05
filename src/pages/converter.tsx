import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { Plus } from "@phosphor-icons/react";
import styles from '@/styles/Converter.module.css';

import { ColorTranslator } from 'colortranslator';

interface Params extends ParsedUrlQuery {
	color: string;
	type: string;
}

export default function Converter() {
	const router = useRouter();
	const params = router.query as Params
	const [color, setColor] = useState<string>(params.color ?? '#FFFFFF')

	const colorTranslator = new ColorTranslator(color)

	function handleNewColor() {
		router.push({
			pathname: '/'
		});
	}

	async function copyTextToClipboard(text: string) {
		if ('clipboard' in navigator) {
			return await navigator.clipboard.writeText(text);
		} else {
			return document.execCommand('copy', true, text);
		}
	}

	const colors = [
		{
			titulo: 'HEX',
			valor: colorTranslator.HEX
		},
		{
			titulo: 'HEXA',
			valor: colorTranslator.HEXA
		},
		{
			titulo: 'RGB',
			valor: colorTranslator.RGB
		},
		{
			titulo: 'RGBA',
			valor: colorTranslator.RGBA
		},
		{
			titulo: 'RGB',
			valor: `(${(colorTranslator.R/255).toFixed(4)}, ${(colorTranslator.G/255).toFixed(4)}, ${(colorTranslator.B/255).toFixed(4)})`
		},
		
		{
			titulo: 'RGBA',
			valor: `(${(colorTranslator.R/255).toFixed(4)}, ${(colorTranslator.G/255).toFixed(4)}, ${(colorTranslator.B/255).toFixed(4)}, ${colorTranslator.A})`
		},
		{
			titulo: 'CMYK',
			valor: colorTranslator.CMYK
		},
		{
			titulo: 'CMYKA',
			valor: colorTranslator.CMYKA
		},
		{
			titulo: 'HSL',
			valor: colorTranslator.HSL
		},
		{
			titulo: 'HSLA',
			valor: colorTranslator.HSLA
		}
	];

	return (
		<main className={styles.main}>
			<header>
				<div>
					<p>Color to convert</p>
					<h2>{color}</h2>
				</div>
				<button
					onClick={handleNewColor}
				>
					<Plus size={20} color="#ffffff" weight="bold" />
					New
				</button>
			</header>

			<div className={styles.grid}>
				{colors.map((cor, index) => (
					<div 
						key={index}
						onClick={e => copyTextToClipboard(cor.valor)}
						title='Click to copy'
					>
						<h1
							style={{
								backgroundColor: colorTranslator.HEX,
								color: '#fff'
							}}
						>
							{cor.titulo}
						</h1>
						<p>{cor.valor}</p>
					</div>
				))}
			</div>

		</main>
	)
}