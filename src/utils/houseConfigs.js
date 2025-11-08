import vis from '../assets/konfigurator/stock.png'
import light from '../assets/light.png'
import dach from '../assets/konfigurator/dach.png'
import roletyImg from '../assets/konfigurator/rolety/rolety.png'
import blachanarabek from '../assets/konfigurator/tynk/blachanarabek.png'
import tynkiblacha from '../assets/konfigurator/tynk/tynkiblacha.png'
import tynkmineralny from '../assets/konfigurator/tynk/tynkmineralny.png'
import lamele from '../assets/konfigurator/tynk/lamele.png'
import tynkantracyt from '../assets/konfigurator/tynk/antracytelewacja.png'
import lameleciemne from '../assets/konfigurator/tynk/lamele-ciemne.png'
import antracytlamele from '../assets/konfigurator/tynk/antracytlamele.png'
import bialelameleimg from '../assets/konfigurator/tynk/bialelamele.png'
import oknoAntracyt from '../assets/konfigurator/okna/antracyt.png'
import oknoSzary from '../assets/konfigurator/okna/szary.png'
import oknoDab from '../assets/konfigurator/okna/dab.png'
import oknoOrzech from '../assets/konfigurator/okna/orzech.png'
import oknoBiale from '../assets/konfigurator/okna/biale.png'
import wlasne from '../assets/konfigurator/drzwi/dzrwi0.png'
import drzwi11S3 from '../assets/konfigurator/drzwi/dzrwi11s3.png'
import drzwiP9 from '../assets/konfigurator/drzwi/dzrwip9.png'
import drzwi14A from '../assets/konfigurator/drzwi/dzrwi14a.png'
import stockthumb from '../assets/konfigurator/thumbnails/stock.jpg'
import blachanarabekthumb from '../assets/konfigurator/thumbnails/blachanarabek.jpg'
import tynkiblachathumb from '../assets/konfigurator/thumbnails/tynkiblacha.jpg'
import tynkmineralnythumb from '../assets/konfigurator/thumbnails/tynkmineralny.jpg'
import lamelethumb from '../assets/konfigurator/thumbnails/lamele.png'
import ciemnelamelethumb from '../assets/konfigurator/thumbnails/Bez nazwy-2.png'
import bialelamele from '../assets/konfigurator/thumbnails/bialelamele.png'
import czarnelamele from '../assets/konfigurator/thumbnails/czarnelamele.png'
import antracytthumb from '../assets/konfigurator/thumbnails/antracyt.jpg'
import bialythumb from '../assets/konfigurator/thumbnails/bialy.jpg'
import antracytoknothumb from '../assets/konfigurator/thumbnails/drutex_iglo_antracyt_thumb.jpg'
import bialyoknothumb from '../assets/konfigurator/thumbnails/drutex_iglo_bialy_thumb.jpg'
import daboknothumb from '../assets/konfigurator/thumbnails/drutex_iglo_dab_thumb.jpg'
import orzechoknothumb from '../assets/konfigurator/thumbnails/drutex_iglo_orzech_thumb.jpg'
import szaryoknothumb from '../assets/konfigurator/thumbnails/drutex_iglo_szary_thumb.jpg'
// Import rolety thumbnails
import roletySzarathumb from '../assets/konfigurator/thumbnails/drutex_rolety_szare_62_t.jpg'
import roletyBialathumb from '../assets/konfigurator/thumbnails/drutex_rolety_bialy_2_t.jpg'
import roletyCzarnathumb from '../assets/konfigurator/thumbnails/drutex_rolety_antracyt_23_t.jpg'
import roletyBrazowathumb from '../assets/konfigurator/thumbnails/drutex_rolety_orzech_28_t.jpg'
import roletyDabthumb from '../assets/konfigurator/thumbnails/drutex_rolety_turner_oak_t.jpg'

import roletySzara from '../assets/konfigurator/rolety/d126_r1_szary.png'
import roletyBiala from '../assets/konfigurator/rolety/d126_r1_bialy.png'
import roletyCzarna from '../assets/konfigurator/rolety/rolety.png'
import roletyBrazowa from '../assets/konfigurator/rolety/d126_r1_orzech.png'
import roletyDabowa from '../assets/konfigurator/rolety/d126_r1_dab.png'

import drzwi11S3thumb from '../assets/konfigurator/thumbnails/kmt_11s3.jpeg'
import drzwiP9thumb from '../assets/konfigurator/thumbnails/kmt_perfekt_9.jpeg'
import drzwi14Athumb from '../assets/konfigurator/thumbnails/kmt_14a.jpeg'
import wlasnethumb from '../assets/konfigurator/thumbnails/ah_drzwi_techniczne (1).jpg'

export const HOUSE_CONFIGS = {
  // Dom 1 - oryginalna konfiguracja
  house1: {
    id: 'house1',
    name: 'Dom Modelowy 1',
    baseImage: vis,
    overlayImages: {
      light: light,
      dach: dach
    },
    options: {
      tynk: [
        { id: 0, name: 'Elewacja surowa', thumb: stockthumb, image: null },
        { id: 1, name: 'Blacha na rąbek', thumb: blachanarabekthumb, image: blachanarabek },
        { id: 2, name: 'Tynk + blacha', thumb: tynkiblachathumb, image: tynkiblacha },
        { id: 3, name: 'Tynk mineralny', thumb: tynkmineralnythumb, image: tynkmineralny, hasColors: true },
        { id: 4, name: 'Lamele', thumb: lamelethumb, image: lamele, hasColors: true }
      ],
      kolor: {
        3: [ // Tynk mineralny - kolory
          { id: 3, name: 'Biała', thumb: bialythumb, image: tynkmineralny },
          { id: 5, name: 'Antracyt', thumb: antracytthumb, image: tynkantracyt }
        ],
        4: [ // Lamele - kolory
          { id: 4, name: 'Jasne', thumb: lamelethumb, image: lamele },
          { id: 6, name: 'Ciemne', thumb: ciemnelamelethumb, image: lameleciemne },
          {id: 7, name: 'Antracyt', thumb: czarnelamele, image: antracytlamele },
          {id: 8, name: 'Białe', thumb: bialelamele, image: bialelameleimg },
        ]
      },
      rolety: [
        { id: 1, name: 'Szare', thumb: roletySzarathumb, image: roletySzara },
        { id: 2, name: 'Białe', thumb: roletyBialathumb, image: roletyBiala },
        { id: 3, name: 'Antracyt', thumb: roletyCzarnathumb, image: roletyCzarna },
        { id: 4, name: 'Orzech', thumb: roletyBrazowathumb, image: roletyBrazowa },
        { id: 5, name: 'Dąb', thumb: roletyDabthumb, image: roletyDabowa }
      ],
      okna: [
        { id: 1, name: 'Antracyt', thumb: antracytoknothumb, image: oknoAntracyt },
        { id: 2, name: 'Szary', thumb: szaryoknothumb, image: oknoSzary },
        { id: 3, name: 'Dąb', thumb: daboknothumb, image: oknoDab },
        { id: 4, name: 'Orzech', thumb: orzechoknothumb, image: oknoOrzech },
        { id: 5, name: 'Biały', thumb: bialyoknothumb, image: oknoBiale }
      ],
      drzwi: [
        { id: 1, name: 'Model 11S3', image: drzwi11S3, thumb: drzwi11S3thumb },
        { id: 2, name: 'Model P9', image: drzwiP9, thumb: drzwiP9thumb },
        { id: 3, name: 'Model 14A', image: drzwi14A, thumb: drzwi14Athumb },
        { id: 0, name: 'Własne drzwi', image: wlasne, thumb: wlasnethumb }
      ]
    }
  },



  // Domyślna konfiguracja
  default: {
    // ... konfiguracja domyślna
  }
}