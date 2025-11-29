import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	screens: {
  		sm: '640px',
  		md: '768px',
  		lg: '1024px',
  		xl: '1280px',
  		'2xl': '1536px',
  		'3xl': '1920px'
  	},
  	extend: {
  		colors: {
  			/* Base UI colors */
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			'hero-background': 'hsl(var(--hero-background))',
  			
  			/* Standard palette - Primary green-blue */
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			
  			/* Standard palette - Secondary green */
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			
  			/* Standard palette - Accent green */
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))',
  				hero: 'hsl(var(--accent-hero))'
  			},
  			
  			/* Standard palette - Blue variants */
  			blue: {
  				muted: 'hsl(var(--blue-muted))',
  				alt: 'hsl(var(--blue-alt))'
  			},
  			
  			/* Standard palette - Gray variants */
  			gray: {
  				light: 'hsl(var(--gray-light))',
  				medium: 'hsl(var(--gray-medium))',
  				dark: 'hsl(var(--gray-dark))'
  			},
  			
  			/* Standard palette - Black */
  			black: 'hsl(var(--black))',
  			
  			/* Success using green */
  			success: {
  				DEFAULT: 'hsl(var(--success))',
  				foreground: 'hsl(var(--success-foreground))'
  			},
  			
  			/* Destructive (muted red) */
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			
  			/* Muted */
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			
  			/* Popover */
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			
  			/* Card */
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			
  			/* Legacy theme mappings */
  			hero: {
  				overlay: 'hsl(var(--hero-overlay))'
  			},
  			navy: {
  				deep: 'hsl(var(--navy-deep))',
  				light: 'hsl(var(--navy-light))'
  			},
  			slate: 'hsl(var(--slate))',
  			cream: 'hsl(var(--cream))',
  			project: {
  				blue: 'hsl(var(--project-blue))',
  				brown: 'hsl(var(--project-brown))',
  				teal: 'hsl(var(--project-teal))',
  				pink: 'hsl(var(--project-pink))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'Inter',
  				'ui-sans-serif',
  				'system-ui',
  				'sans-serif',
  				'Apple Color Emoji',
  				'Segoe UI Emoji',
  				'Segoe UI Symbol',
  				'Noto Color Emoji'
  			],
  			serif: [
  				'Playfair Display',
  				'ui-serif',
  				'Georgia',
  				'Cambria',
  				'Times New Roman',
  				'Times',
  				'serif'
  			],
  			brand: [
  				'DM Sans',
  				'sans-serif'
  			],
  			mono: [
  				'ui-monospace',
  				'SFMono-Regular',
  				'Menlo',
  				'Monaco',
  				'Consolas',
  				'Liberation Mono',
  				'Courier New',
  				'monospace'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;