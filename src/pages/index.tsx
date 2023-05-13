import { useState, FormEvent, useRef, useEffect } from 'react';
import { X, ArrowRight } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from 'querystring';
import styles from '@/styles/Home.module.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ColorTranslator } from 'colortranslator';

interface Params extends ParsedUrlQuery {
	color: string;
	type: string;
}

export default function Home() {
	const [color, setColor] = useState<string>('')
	const router = useRouter();
	const inputRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (await validate()) {
			router.push({
				pathname: '/converter',
				query: {
					color,
					type: 'HEX'
				} as Params
			});
		}
		else {
			if (color)
				toast.info('Not acceptable', {
					position: "top-center",
					autoClose: 1000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: 0,
					theme: "light",
					style: { color: '#3C424D' }
				});
		}
	}

	function handleClose() {
		router.back()
	}

	async function validate() {
		try {
			new ColorTranslator(color)
		}
		catch {
			return false
		}

		return true
	}

	return (
		<main className={styles.main}>

			<form onSubmit={handleSubmit}>
				<div className={styles.textCenter}>
					<h1>Color converter</h1>
					<p>Enter a color to convert</p>
				</div>

				<div className={styles.inputColor}>
					<input
						type="text"
						placeholder='#FFFFFF'
						ref={inputRef}
						value={color}
						onChange={e => setColor(e.target.value)}
					/>
					<button
						type='submit'
						className={
							color ?
								styles.buttonInputColorAllow
								:
								styles.buttonInputColorDeny
						}
					>
						Converte
						<ArrowRight size={24} color="#ffffff" weight="bold" />
					</button>
				</div>
			</form>

			<button
				className={styles.closeButton}
				onClick={handleClose}
			>
				<X size={24} weight="bold" />
			</button>

			<ToastContainer
				position="top-center"
				autoClose={1000}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>

		</main>
	)
}