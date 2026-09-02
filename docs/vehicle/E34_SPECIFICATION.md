# Target vehicle specification

Canonical configuration ID: `bmw-e34-1995-525i-us-manual`

## Scope

The initial vehicle is a United States-market 1995 BMW 525i E34 four-door sedan with the five-speed manual transmission. Data from European 525i variants and automatic-transmission cars is not silently merged into this configuration.

## Verified parameters

| Parameter | Value | Applicability | Source |
| --- | --- | --- | --- |
| Engine | M50TU / M50B25TU, inline-six, intake VANOS | 1993-on 525i | BMW Group Classic; Bentley 100-1 |
| Displacement | 2494 cm3 | E34 525i M50 era | BMW Group Classic; Bentley 100-1, physical PDF p. 43 |
| Compression ratio | 10.5:1 | US 1993-on 525i | Bentley 100-1, physical PDF p. 43 |
| Rated power | 188 hp SAE net at 5900 rpm | US manual convention | Bentley 100-1, physical PDF p. 43 |
| Rated torque | 184 lb-ft SAE net at 4200 rpm | US manual convention | Bentley 100-1, physical PDF p. 43 |
| Manual gearbox | Getrag S5D 250 G | 525i from 7/1992 | Bentley 200-2 / 230-1, physical PDF p. 224 |
| Forward ratios | 4.20, 2.49, 1.66, 1.24, 1.00 | S5D 250 G | Bentley table b, 200-2 |
| Drive | Rear-wheel drive | selected configuration | Bentley transmission/driveshaft groups |

[BMW Group Classic](https://www.bmwgroup-classic.com/en/models/bmw-classics/product-description-page.ad-152-1.bmw-525i-e34.html) confirms that the M50TU with intake VANOS entered 525i production in September 1992 and lists 2494 cm3. Its 192 hp figure is retained as a European-market value; the US-oriented Bentley table's 188 hp SAE net is used for this configuration.

## Provisional parameters

Length 4.720 m, width 1.751 m, height 1.412 m, wheelbase 2.761 m, and manual-transmission curb mass 1580 kg are cross-source provisional values. They remain unsuitable for claims of factory precision until a primary US-market technical sheet is obtained. The 205/65 R15 wheel/tire assumption is used only to exercise the vertical-slice wheel equations. Final-drive ratio remains unresolved and null.

## Market and model-year hazards

- BMW Group Classic's model page reports European-style output, while the supplied US repair reference reports SAE net output.
- Manual and automatic cars have different transmission masses and ratios.
- Option content affects curb mass and wheel/tire fitment.
- 1995 production may include configuration changes by production date; VIN/build-sheet applicability is the eventual authority for the owner vehicle.
