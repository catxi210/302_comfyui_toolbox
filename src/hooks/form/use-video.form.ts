import { formHookFactory } from "./form-hook-factory";
import {
  videoModeFormSchema,
  VideoModeFormType,
} from "@/components/forms/specific-form/video-mode/schema";
import {
  defaultState,
  videoModeFormStore,
} from "@/stores/slices/video_mode_form.store";
import { useVideoModeApi } from "../api/use-video-mode.api";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

const FORM_HOOK_NAME = "useVideoModeForm";
const TRANSLATION_KEY = "left_panel.hooks.video_mode";

export function useVideoModeForm() {
  const t = useTranslations("left_panel.hooks.video_mode");

  const useVideoModeFormHook = formHookFactory<VideoModeFormType>({
    name: FORM_HOOK_NAME,
    schema: videoModeFormSchema,
    store: videoModeFormStore,
    defaultState,
    translationKey: TRANSLATION_KEY,
  })();

  const { getValues, validateForm } = useVideoModeFormHook;

  const { isCreating, handleProcessTask } = useVideoModeApi({
    getValues: getValues,
    validateForm: validateForm,
  });

  const cameraLanguages = useMemo(
    () => [
      {
        label: t("camera_languages.push_in"),
        value:
          "Push In, The camera advances forward and gradually approaches the subject being photographed.",
      },
      {
        label: t("camera_languages.pull_out_pull_back"),
        value:
          "Pull Out/Pull Back, The camera gradually moves away from the subject being photographed.",
      },
      {
        label: t("camera_languages.pan"),
        value: "Pan, The camera rotates horizontally.",
      },
      {
        label: t("camera_languages.high_angle_shot"),
        value: "High Angle Shot, Shooting downward from a high position.",
      },
      {
        label: t("camera_languages.low_angle_shot"),
        value: "Low Angle Shot, Shooting upward from a low position.",
      },
      {
        label: t("camera_languages.follow_shot"),
        value: "Follow Shot, Moving with the subject being filmed.",
      },
      {
        label: t("camera_languages.circular_track"),
        value:
          "Circular Track, The camera moves 360 degrees around the subject.",
      },
      {
        label: t("camera_languages.parallel_track"),
        value:
          "Parallel Track, The camera maintains parallel movement with the moving subject.",
      },
      {
        label: t("camera_languages.crane_shot"),
        value:
          "Crane Shot, Using a camera crane for vertical or compound movements.",
      },
      {
        label: t("camera_languages.dutch_angle"),
        value: "Dutch Angle, Shooting with a tilted camera angle.",
      },
      {
        label: t("camera_languages.handheld_shot"),
        value: "Handheld Shot, Filming with a handheld camera.",
      },
      {
        label: t("camera_languages.time_lapse"),
        value:
          "Time-Lapse, Fixed camera position rapidly recording slow changes over time.",
      },
      {
        label: t("camera_languages.dolly_shot"),
        value: "Dolly Shot, Using tracks to achieve smooth movement.",
      },
      {
        label: t("camera_languages.pedestal_shot"),
        value: "Pedestal Shot, Vertical up and down camera movement.",
      },
      {
        label: t("camera_languages.diagonal_movement"),
        value: "Diagonal Movement, Moving along a diagonal line.",
      },
      {
        label: t("camera_languages.snap_zoom"),
        value: "Snap Zoom, Quick push and pull with zoom.",
      },
      {
        label: t("camera_languages.jib_shot"),
        value: "Jib Shot, Using a jib arm for compound movements.",
      },
      {
        label: t("camera_languages.shoulder_mount"),
        value: "Shoulder Mount, Filming with a shoulder-mounted camera.",
      },
      {
        label: t("camera_languages.weaving_shot"),
        value: "Weaving Shot, Moving between multiple objects.",
      },
      {
        label: t("camera_languages.pivot_shot"),
        value: "Pivot Shot, Rotating around a fixed point.",
      },
      {
        label: t("camera_languages.reverse_follow"),
        value:
          "Reverse Follow, Filming a moving subject while walking backward.",
      },
      {
        label: t("camera_languages.whip_pan"),
        value: "Whip Pan, Quick horizontal or vertical camera rotation.",
      },
      {
        label: t("camera_languages.aerial_shot"),
        value: "Aerial Shot, Aerial photography or high-angle overview.",
      },
      {
        label: t("camera_languages.pov_shot"),
        value: "POV Shot, Simulating a character's point of view.",
      },
      {
        label: t("camera_languages.slow_push"),
        value: "Slow Push, Slowly moving forward.",
      },
      {
        label: t("camera_languages.in_frame_movement"),
        value:
          "In-Frame Movement, Maintaining composition changes within the frame.",
      },
      {
        label: t("camera_languages.rack_focus"),
        value: "Rack Focus, Changing focus between subjects.",
      },
      {
        label: t("camera_languages.floating_shot"),
        value:
          "Floating Shot, Using a stabilizer to achieve a floating effect.",
      },
      {
        label: t("camera_languages.z_axis_movement"),
        value: "Z-Axis Movement, Moving along the depth of field.",
      },
      {
        label: t("camera_languages.combined_movement"),
        value: "Combined Movement, Combination of multiple movement types.",
      },
    ],
    [t]
  );

  const expressions = useMemo(
    () => [
      {
        label: t("expressions.gentle_smile"),
        value:
          "Gentle Smile, Focus on capturing slightly upturned corners of the mouth and fine wrinkles around the eyes.",
      },
      {
        label: t("expressions.hearty_laugh"),
        value:
          "Hearty Laugh, Capture squinting eyes and naturally visible teeth.",
      },
      {
        label: t("expressions.contemplative"),
        value: "Contemplative, Emphasize furrowed brows and focused gaze.",
      },
      {
        label: t("expressions.surprised"),
        value:
          "Surprised, Focus on capturing wide eyes and slightly parted lips.",
      },
      {
        label: t("expressions.puzzled"),
        value:
          "Puzzled, Emphasize slightly furrowed brows and tilted head movement.",
      },
      {
        label: t("expressions.silly_smile"),
        value: "Silly Smile, Highlight rosy cheeks and curved eyes.",
      },
      {
        label: t("expressions.serious"),
        value: "Serious, Focus on stability and authority in the expression.",
      },
      {
        label: t("expressions.sad"),
        value: "Sad, Capture hollow eyes and downturned mouth corners.",
      },
      {
        label: t("expressions.angry"),
        value: "Angry, Emphasize tightly furrowed brows and sharp gaze.",
      },
      {
        label: t("expressions.scared"),
        value: "Scared, Highlight dilated pupils and tense facial features.",
      },
      {
        label: t("expressions.proud"),
        value:
          "Proud, Focus on capturing chest out, head held high, and confident smile.",
      },
      {
        label: t("expressions.shy"),
        value:
          "Shy, Capture downward gaze with a smile and avoiding eye contact.",
      },
      {
        label: t("expressions.sleepy"),
        value: "Sleepy, Show half-closed eyes and yawning.",
      },
      {
        label: t("expressions.focused"),
        value: "Focused, Highlight piercing gaze and concentrated expression.",
      },
      {
        label: t("expressions.relieved"),
        value: "Relieved, Show relaxed brows and deep breathing.",
      },
      {
        label: t("expressions.yearning"),
        value: "Yearning, Focus on capturing sparkling eyes and gentle smile.",
      },
      {
        label: t("expressions.impatient"),
        value: "Impatient, Show frequent watch-checking and pacing movements.",
      },
      {
        label: t("expressions.disgusted"),
        value:
          "Disgusted, Highlight frowning with pursed lips and avoidance movements.",
      },
      {
        label: t("expressions.coquettish"),
        value: "Coquettish, Show sweet smile and body twisting.",
      },
      {
        label: t("expressions.awkward"),
        value: "Awkward, Capture forced smile and fidgeting.",
      },
      {
        label: t("expressions.enchanted"),
        value: "Enchanted, Show dreamy eyes and intoxicated smile.",
      },
      {
        label: t("expressions.alert"),
        value: "Alert, Highlight sharp eyes and tense body.",
      },
      {
        label: t("expressions.gratified"),
        value: "Gratified, Show warm smile with tears in eyes.",
      },
      {
        label: t("expressions.blank"),
        value: "Blank, Show vacant eyes and expressionless face.",
      },
      {
        label: t("expressions.sly"),
        value: "Sly, Focus on capturing cunning smile and lively eyes.",
      },
      {
        label: t("expressions.grateful"),
        value: "Grateful, Show sincere smile with slight bow.",
      },
      {
        label: t("expressions.disappointed"),
        value: "Disappointed, Show dim eyes and sighing gesture.",
      },
      {
        label: t("expressions.confident"),
        value: "Confident, Highlight chest out, head up, and determined gaze.",
      },
      {
        label: t("expressions.exhausted"),
        value: "Exhausted, Show lifeless eyes and slouched body.",
      },
      {
        label: t("expressions.curious"),
        value: "Curious, Show bright eyes and forward-leaning body.",
      },
      {
        label: t("expressions.guilty"),
        value: "Guilty, Show avoiding gaze and nervous movements.",
      },
      {
        label: t("expressions.arrogant"),
        value: "Arrogant, Highlight raised chin and contemptuous gaze.",
      },
      {
        label: t("expressions.wronged"),
        value: "Wronged, Show teary eyes and pouting.",
      },
      {
        label: t("expressions.worried"),
        value: "Worried, Show furrowed brows in thought and pacing.",
      },
      {
        label: t("expressions.sweet"),
        value: "Sweet, Focus on capturing sweet smile and gentle eyes.",
      },
      {
        label: t("expressions.helpless"),
        value: "Helpless, Show shrugging shoulders with bitter smile.",
      },
      {
        label: t("expressions.shocked"),
        value: "Shocked, Highlight wide-open mouth and leaning back.",
      },
      {
        label: t("expressions.pride"),
        value: "Pride, Show chest out, head up, and happy smile.",
      },
      {
        label: t("expressions.suspicious"),
        value: "Suspicious, Show squinting eyes and thoughtful expression.",
      },
      {
        label: t("expressions.pain"),
        value: "Pain, Show locked brows and curled up body.",
      },
      {
        label: t("expressions.doting"),
        value: "Doting, Show gentle smile and loving gaze.",
      },
      {
        label: t("expressions.delighted"),
        value: "Delighted, Show surprised smile and joyful jumping.",
      },
      {
        label: t("expressions.meditative"),
        value: "Meditative, Highlight quiet expression and distant gaze.",
      },
      {
        label: t("expressions.disdainful"),
        value: "Disdainful, Show sneer and lip-curling gesture.",
      },
      {
        label: t("expressions.anticipating"),
        value: "Anticipating, Show expectant eyes and warm smile.",
      },
      {
        label: t("expressions.stubborn"),
        value: "Stubborn, Show pressed lips and determined eyes.",
      },
      {
        label: t("expressions.gentle"),
        value: "Gentle, Show warm smile and delicate movements.",
      },
      {
        label: t("expressions.indifferent"),
        value: "Indifferent, Show expressionless face and cold eyes.",
      },
      {
        label: t("expressions.excited"),
        value: "Excited, Show joyful jumping and sparkling eyes.",
      },
      {
        label: t("expressions.enlightened"),
        value: "Enlightened, Show brightened eyes and cheerful expression.",
      },
    ],
    [t]
  );

  const emotions = useMemo(
    () => [
      {
        label: t("emotions.joy"),
        value:
          "Sincere joy and excitement, Focus on capturing natural smiles and body movements.",
      },
      {
        label: t("emotions.affectionate_gaze"),
        value:
          "Affectionate gaze full of love, Emphasize eye expressions and subtle facial movements.",
      },
      {
        label: t("emotions.contemplative"),
        value:
          "Immersed in contemplation, Highlight quiet atmosphere and focused state.",
      },
      {
        label: t("emotions.melancholy"),
        value:
          "Suppressed melancholy emotions, Capture subtle emotional changes and light-shadow effects.",
      },
      {
        label: t("emotions.furious"),
        value:
          "Intense anger emotions, Emphasize facial muscle tension and body language.",
      },
      {
        label: t("emotions.worried"),
        value: "Persistent state of worry, Show detailed anxious movements.",
      },
      {
        label: t("emotions.ecstatic"),
        value: "Extreme joy, Capture the continuity of body movements.",
      },
      {
        label: t("emotions.dejected"),
        value: "Lost and depressed, Emphasize overall depressed atmosphere.",
      },
      {
        label: t("emotions.passionate"),
        value: "Strong emotional surge, Highlight emotional outburst points.",
      },
      {
        label: t("emotions.enduring"),
        value:
          "Suppressed and restrained emotions, Show external expressions of inner struggle.",
      },
      {
        label: t("emotions.blooming_joy"),
        value: "Joy from within, Capture naturally relaxed expressions.",
      },
      {
        label: t("emotions.panic"),
        value: "Panic and confusion, Show tense and disordered state.",
      },
      {
        label: t("emotions.serene"),
        value:
          "Peaceful and serene, Emphasize external manifestation of inner peace.",
      },
      {
        label: t("emotions.enthusiastic"),
        value:
          "Full of enthusiasm and vitality, Highlight positive and upward mental state.",
      },
      {
        label: t("emotions.discouraged"),
        value: "Hopeless depression, Show overall sense of negative emotions.",
      },
      {
        label: t("emotions.elated"),
        value: "Encouraging joy, Capture positive emotional expressions.",
      },
      {
        label: t("emotions.exhausted"),
        value: "Mental exhaustion, Show details of fatigue.",
      },
      {
        label: t("emotions.triumphant"),
        value: "Sense of achievement, Highlight state of confident radiance.",
      },
      {
        label: t("emotions.terrified"),
        value: "Extreme fear, Show physical reactions to fear.",
      },
      {
        label: t("emotions.enraged"),
        value: "Anger to the extreme, Capture the peak of angry emotions.",
      },
      {
        label: t("emotions.carefree"),
        value:
          "Pleasant and cheerful mood, Show relaxed and comfortable state.",
      },
      {
        label: t("emotions.nervous"),
        value: "Nervous and uneasy, Show subtle nervous movements.",
      },
      {
        label: t("emotions.heartbroken"),
        value: "Extremely heartbroken, Highlight painful body language.",
      },
      {
        label: t("emotions.radiant"),
        value: "Radiant and energetic, Capture vibrant and energetic state.",
      },
      {
        label: t("emotions.lingering_fear"),
        value: "Lingering fear emotions, Show residual fear emotions.",
      },
      {
        label: t("emotions.helpless"),
        value: "Helpless emotions, Show state of resignation.",
      },
      {
        label: t("emotions.content"),
        value:
          "Satisfied emotions, Capture subtle expressions of satisfaction.",
      },
      {
        label: t("emotions.grief_stricken"),
        value: "Extreme sorrow, Show state of extreme sorrow.",
      },
      {
        label: t("emotions.eagerly_waiting"),
        value: "Eager anticipation, Highlight sense of urgent anticipation.",
      },
      {
        label: t("emotions.flustered"),
        value: "Confused emotions, Show overall expression of confusion.",
      },
      {
        label: t("emotions.overjoyed"),
        value: "Extreme happiness, Capture continuous joyful movements.",
      },
      {
        label: t("emotions.telepathic"),
        value: "Mutual understanding, Show moments of tacit interaction.",
      },
      {
        label: t("emotions.relieved"),
        value: "Relieved and relaxed, Highlight state of pressure release.",
      },
      {
        label: t("emotions.startled"),
        value: "Startled and shocked, Capture instant shock reactions.",
      },
      {
        label: t("emotions.jubilant"),
        value: "Happy and joyful, Show overall happy atmosphere.",
      },
      {
        label: t("emotions.composed"),
        value: "Peaceful and calm, Show state of inner peace.",
      },
      {
        label: t("emotions.deeply_worried"),
        value: "Deep worry, Highlight continuous state of concern.",
      },
      {
        label: t("emotions.yearning"),
        value: "Yearning and longing, Capture longing expressions.",
      },
      {
        label: t("emotions.anxious"),
        value: "Urgent anxiety, Show state of anxiety.",
      },
      {
        label: t("emotions.infatuated"),
        value: "Fascinated and obsessed, Show state of obsession.",
      },
      {
        label: t("emotions.grateful"),
        value: "Grateful and thankful, Highlight ceremonial grateful gestures.",
      },
      {
        label: t("emotions.willing"),
        value: "Sweet as honey, Show peaceful state of willingness.",
      },
      {
        label: t("emotions.distressed"),
        value: "Irritable and restless, Capture detailed irritated movements.",
      },
      {
        label: t("emotions.restless"),
        value: "Wild joy, Highlight continuous state of unease.",
      },
      {
        label: t("emotions.at_peace"),
        value: "Peace of mind, Show state of inner peace.",
      },
      {
        label: t("emotions.sudden_sadness"),
        value: "Sudden sadness, Capture moment of sadness outbreak.",
      },
      {
        label: t("emotions.delighted"),
        value: "Joy blooming, Show state of blooming joy.",
      },
      {
        label: t("emotions.weary"),
        value:
          "Physical and mental exhaustion, Highlight overall sense of fatigue.",
      },
      {
        label: t("emotions.serene_joy"),
        value: "Pleasant mood, Show state of joyful relaxation.",
      },
    ],
    [t]
  );

  const mukbangActions = useMemo(
    () => [
      {
        label: t("mukbang_actions.pick_up"),
        value:
          "Mukbang industry actions, Pick Up, Stable food retrieval, Close up shots highlighting the texture of food.",
      },
      {
        label: t("mukbang_actions.bite"),
        value:
          "Mukbang industry actions, Bite, Elegant Bite of Food, 45 degree angle on the side, highlighting the taste.",
      },
      {
        label: t("mukbang_actions.stir"),
        value:
          "Mukbang industry actions, Stir, Even stirring of ingredients, Overhead close-up showing color changes.",
      },
      {
        label: t("mukbang_actions.tear"),
        value:
          "Mukbang industry actions, Tear, Graceful package opening, Smooth hand movements highlighting freshness.",
      },
      {
        label: t("mukbang_actions.pour"),
        value:
          "Mukbang industry actions, Pour, Slow liquid pouring, Close-up shots capturing flowing motion.",
      },
      {
        label: t("mukbang_actions.dip"),
        value:
          "Mukbang industry actions, Dip, Sauce dipping process, Horizontal close-up showing sauce consistency.",
      },
      {
        label: t("mukbang_actions.mix"),
        value:
          "Mukbang industry actions, Mix, Even mixing of ingredients, Overhead wide shot showing ingredient combination.",
      },
      {
        label: t("mukbang_actions.pull"),
        value:
          "Mukbang industry actions, Pull, Pulling cheese strings, Close-up shots highlighting stringy effect.",
      },
      {
        label: t("mukbang_actions.cut"),
        value:
          "Mukbang industry actions, Cut, Neat food cutting, 45-degree overhead shot showing internal layers.",
      },
      {
        label: t("mukbang_actions.taste"),
        value:
          "Mukbang industry actions, Taste, Elegant food tasting, Side close-up showing expression changes.",
      },
      {
        label: t("mukbang_actions.squeeze"),
        value:
          "Mukbang industry actions, Squeeze, Sauce decoration squeezing, Close-up shots highlighting decorative effect.",
      },
      {
        label: t("mukbang_actions.scoop"),
        value:
          "Mukbang industry actions, Scoop, Food scooping process, Side close-up showing texture.",
      },
      {
        label: t("mukbang_actions.sprinkle"),
        value:
          "Mukbang industry actions, Sprinkle, Seasoning sprinkling, Overhead close-up showing evenness.",
      },
      {
        label: t("mukbang_actions.slurp"),
        value:
          "Mukbang industry actions, Slurp, Noodle and soup intake, 45-degree side angle highlighting sound effect.",
      },
      {
        label: t("mukbang_actions.blanch"),
        value:
          "Mukbang industry actions, Blanch, Ingredient blanching, Close-up shots showing blanching process.",
      },
      {
        label: t("mukbang_actions.press"),
        value:
          "Mukbang industry actions, Press, Pressing food layers, Side close-up showing layering.",
      },
      {
        label: t("mukbang_actions.shake"),
        value:
          "Mukbang industry actions, Shake, Drink mixing shaking, Wide shot showing mixing process.",
      },
      {
        label: t("mukbang_actions.plate"),
        value:
          "Mukbang industry actions, Plate, Elegant plating process, Overhead wide shot highlighting composition aesthetics.",
      },
      {
        label: t("mukbang_actions.wrap"),
        value:
          "Mukbang industry actions, Wrap, Food wrapping process, Close-up shots showing wrapping technique.",
      },
      {
        label: t("mukbang_actions.knead"),
        value:
          "Mukbang industry actions, Knead, Dough kneading process, Close-up shots showing texture.",
      },
      {
        label: t("mukbang_actions.pour_sauce"),
        value:
          "Mukbang industry actions, Pour Sauce, Sauce pouring, Close-up shots highlighting flowing motion.",
      },
      {
        label: t("mukbang_actions.pull_apart"),
        value:
          "Mukbang industry actions, Pull Apart, Tearing bread or meat, Close-up shots showing layers.",
      },
      {
        label: t("mukbang_actions.sip"),
        value:
          "Mukbang industry actions, Sip, Elegant sipping, Side close-up showing elegance.",
      },
      {
        label: t("mukbang_actions.pick"),
        value:
          "Mukbang industry actions, Pick, Ingredient selection, Close-up shots showing selection process.",
      },
      {
        label: t("mukbang_actions.match"),
        value:
          "Mukbang industry actions, Match, Ingredient pairing display, Wide shot showing pairing aesthetics.",
      },
      {
        label: t("mukbang_actions.garnish"),
        value:
          "Mukbang industry actions, Garnish, Decoration process, Close-up shots highlighting delicacy.",
      },
      {
        label: t("mukbang_actions.break"),
        value:
          "Mukbang industry actions, Break, Food breaking display, Close-up shots showing filling.",
      },
      {
        label: t("mukbang_actions.season"),
        value:
          "Mukbang industry actions, Season, Seasoning addition, Close-up shots showing amount.",
      },
      {
        label: t("mukbang_actions.chew"),
        value:
          "Mukbang industry actions, Chew, Slow chewing display, Side close-up showing texture.",
      },
      {
        label: t("mukbang_actions.mix_noodles"),
        value:
          "Mukbang industry actions, Mix Noodles, Noodle mixing process, Overhead close-up showing evenness.",
      },
      {
        label: t("mukbang_actions.drip"),
        value:
          "Mukbang industry actions, Drip, Sauce dripping effect, Close-up shots capturing moments.",
      },
      {
        label: t("mukbang_actions.spread"),
        value:
          "Mukbang industry actions, Spread, Sauce spreading process, Close-up shots showing evenness.",
      },
      {
        label: t("mukbang_actions.stack"),
        value:
          "Mukbang industry actions, Stack, Food stacking process, Side close-up showing layers.",
      },
      {
        label: t("mukbang_actions.press_squeeze"),
        value:
          "Mukbang industry actions, Press, Juicing process display, Close-up shots showing juice extraction.",
      },
      {
        label: t("mukbang_actions.shake_mix"),
        value:
          "Mukbang industry actions, Shake Mix, Drink mixing, Wide shot showing process.",
      },
      {
        label: t("mukbang_actions.roll"),
        value:
          "Mukbang industry actions, Roll, Food rolling process, Close-up shots showing technique.",
      },
      {
        label: t("mukbang_actions.pour_in"),
        value:
          "Mukbang industry actions, Pour In, Filling injection, Close-up shots showing filling.",
      },
      {
        label: t("mukbang_actions.slice"),
        value:
          "Mukbang industry actions, Slice, Neat division, 45-degree overhead shot showing cut surface.",
      },
      {
        label: t("mukbang_actions.whip"),
        value:
          "Mukbang industry actions, Whip, Whipping cream, Close-up shots showing texture.",
      },
      {
        label: t("mukbang_actions.spread_out"),
        value:
          "Mukbang industry actions, Spread Out, Ingredient spreading, Overhead wide shot showing area.",
      },
      {
        label: t("mukbang_actions.pinch"),
        value:
          "Mukbang industry actions, Pinch, Edge pinching, Close-up shots showing technique.",
      },
      {
        label: t("mukbang_actions.brush"),
        value:
          "Mukbang industry actions, Brush, Sauce brushing process, Close-up shots showing evenness.",
      },
      {
        label: t("mukbang_actions.shake_off"),
        value:
          "Mukbang industry actions, Shake Off, Seasoning shaking, Close-up shots showing evenness.",
      },
      {
        label: t("mukbang_actions.pipe"),
        value:
          "Mukbang industry actions, Pipe, Piping decoration, Close-up shots showing technique.",
      },
      {
        label: t("mukbang_actions.toss"),
        value:
          "Mukbang industry actions, Toss, Food tossing, Close-up shots showing stir-frying.",
      },
      {
        label: t("mukbang_actions.drizzle"),
        value:
          "Mukbang industry actions, Drizzle, Sauce decoration, Close-up shots showing effect.",
      },
      {
        label: t("mukbang_actions.spread_flat"),
        value:
          "Mukbang industry actions, Spread, Dough flattening, Overhead wide shot showing technique.",
      },
      {
        label: t("mukbang_actions.fill"),
        value:
          "Mukbang industry actions, Fill, Filling stuffing, Close-up shots showing filling.",
      },
      {
        label: t("mukbang_actions.crush"),
        value:
          "Mukbang industry actions, Crush, Ingredient crushing, Close-up shots showing texture.",
      },
      {
        label: t("mukbang_actions.lick"),
        value:
          "Mukbang industry actions, Lick, Ice cream tasting, Side close-up showing enjoyment.",
      },
    ],
    [t]
  );

  const petActions = useMemo(
    () => [
      {
        label: t("pet_actions.cuddle"),
        value:
          "Pet industry actions, Cuddle, Nuzzling and cuddling with owner, Close-up interaction highlighting intimacy.",
      },
      {
        label: t("pet_actions.play"),
        value:
          "Pet Industry Actions Actions, Play, Toy interaction, Wide shot showing energy.",
      },
      {
        label: t("pet_actions.sleep"),
        value:
          "Pet Industry Actions Actions, Sleep, Adorable sleeping posture, Face close-up highlighting cuteness.",
      },
      {
        label: t("pet_actions.eat"),
        value:
          "Pet Industry Actions Actions, Eat, Feeding state, 45-degree side angle showing focus.",
      },
      {
        label: t("pet_actions.groom"),
        value:
          "Pet Industry Actions Actions, Groom, Self-cleaning, Close-up actions showing natural behavior.",
      },
      {
        label: t("pet_actions.stretch"),
        value:
          "Pet Industry Actions Actions, Stretch, Body stretching, Full body shot highlighting posture.",
      },
      {
        label: t("pet_actions.roll"),
        value:
          "Pet Industry Actions Actions, Roll, Rolling on ground, Wide shot showing playfulness.",
      },
      {
        label: t("pet_actions.jump"),
        value:
          "Pet Industry Actions Actions, Jump, Agile jumping, Slow motion showing dynamic beauty.",
      },
      {
        label: t("pet_actions.chase"),
        value:
          "Pet Industry Actions Actions, Chase, Playful pursuit, Wide tracking shot showing fun.",
      },
      {
        label: t("pet_actions.shake_hands"),
        value:
          "Pet Industry Actions Actions, Shake Hands, Handshake with owner, Close-up interaction showing training.",
      },
      {
        label: t("pet_actions.act_cute"),
        value:
          "Pet Industry Actions Actions, Act Cute, Cute expression, Face close-up highlighting expression.",
      },
      {
        label: t("pet_actions.snuggle"),
        value:
          "Pet Industry Actions Actions, Snuggle, Intimate cuddling, Warm atmosphere showing affection.",
      },
      {
        label: t("pet_actions.walk"),
        value:
          "Pet Industry Actions Actions, Walk, Outdoor walking, Following shot showing daily life.",
      },
      {
        label: t("pet_actions.bath"),
        value:
          "Pet Industry Actions Actions, Bath, Bathing process, Close-up reactions showing interaction.",
      },
      {
        label: t("pet_actions.brush"),
        value:
          "Pet Industry Actions Actions, Brush, Fur grooming, Detail close-up showing care.",
      },
      {
        label: t("pet_actions.frolic"),
        value:
          "Pet Industry Actions Actions, Frolic, Joyful play, Wide shot showing energy.",
      },
      {
        label: t("pet_actions.tumble"),
        value:
          "Pet Industry Actions Actions, Tumble, Ground rolling, Continuous action showing cuteness.",
      },
      {
        label: t("pet_actions.scratch"),
        value:
          "Pet Industry Actions Actions, Scratch, Scratching motion, Close-up action showing instinct.",
      },
      {
        label: t("pet_actions.lie_down"),
        value:
          "Pet Industry Actions Actions, Lie Down, Lazy lying, Overall composition showing relaxation.",
      },
      {
        label: t("pet_actions.run"),
        value:
          "Pet Industry Actions Actions, Run, Fast running, Tracking shot showing energy.",
      },
      {
        label: t("pet_actions.bounce"),
        value:
          "Pet Industry Actions Actions, Bounce, Joyful jumping, Slow motion showing vitality.",
      },
      {
        label: t("pet_actions.peek"),
        value:
          "Pet Industry Actions Actions, Peek, Curious peeking, Close-up expression showing interest.",
      },
      {
        label: t("pet_actions.pounce"),
        value:
          "Pet Industry Actions Actions, Pounce, Pouncing at target, Continuous action showing agility.",
      },
      {
        label: t("pet_actions.wag_tail"),
        value:
          "Pet industry actions, Wag Tail, Tail wagging, Close-up action showing emotion.",
      },
      {
        label: t("pet_actions.nuzzle"),
        value:
          "Pet industry actions, Nuzzle, Affectionate face rubbing, Close-up interaction showing emotion.",
      },
      {
        label: t("pet_actions.tail_up"),
        value:
          "Pet industry actions, Tail Up, Tail raised, Side shot showing demeanor.",
      },
      {
        label: t("pet_actions.chew"),
        value:
          "Pet industry actions, Chew, Toy chewing, Close-up action showing focus.",
      },
      {
        label: t("pet_actions.spin"),
        value:
          "Pet industry actions, Spin, Spinning in place, Overhead view showing cuteness.",
      },
      {
        label: t("pet_actions.climb"),
        value:
          "Pet industry actions, Climb, Climbing action, Wide shot showing ability.",
      },
      {
        label: t("pet_actions.fall_down"),
        value:
          "Pet industry actions, Fall Down, Playful falling, Continuous action showing adorableness.",
      },
      {
        label: t("pet_actions.fetch"),
        value:
          "Pet industry actions, Fetch, Item retrieval, Tracking shot showing interaction.",
      },
      {
        label: t("pet_actions.stay_down"),
        value:
          "Pet industry actions, Stay Down, Training position, Full body shot showing training.",
      },
      {
        label: t("pet_actions.stand"),
        value:
          "Pet industry actions, Stand, Standing posture, Full body shot showing posture.",
      },
      {
        label: t("pet_actions.beg"),
        value:
          "Pet industry actions, Beg, Food begging, Close-up expression showing interaction.",
      },
      {
        label: t("pet_actions.guard_food"),
        value:
          "Pet industry actions, Guard Food, Food protection, Close-up action showing instinct.",
      },
      {
        label: t("pet_actions.hide_food"),
        value:
          "Pet industry actions, Hide Food, Food hiding, Tracking action showing habit.",
      },
      {
        label: t("pet_actions.head_shake"),
        value:
          "Pet industry actions, Head Shake, Head shaking, Slow motion showing detail.",
      },
      {
        label: t("pet_actions.rub_legs"),
        value:
          "Pet industry actions, Rub Legs, Leg rubbing, Close-up interaction showing affection.",
      },
      {
        label: t("pet_actions.listen"),
        value:
          "Pet industry actions, Listen, Following commands, Wide shot showing training.",
      },
      {
        label: t("pet_actions.dig"),
        value:
          "Pet industry actions, Dig, Digging action, Close-up action showing instinct.",
      },
      {
        label: t("pet_actions.alert"),
        value:
          "Pet industry actions, Alert, Alert state, Close-up expression showing state.",
      },
      {
        label: t("pet_actions.show_affection"),
        value:
          "Pet industry actions, Show Affection, Showing goodwill, Close-up interaction showing emotion.",
      },
      {
        label: t("pet_actions.search"),
        value:
          "Pet industry actions, Search, Item searching, Following view showing interaction.",
      },
      {
        label: t("pet_actions.hide"),
        value:
          "Pet industry actions, Hide, Hide and seek, Wide shot showing fun.",
      },
      {
        label: t("pet_actions.play_water"),
        value:
          "Pet industry actions, Play Water, Water play, Slow motion showing fun.",
      },
      {
        label: t("pet_actions.chase_tail"),
        value:
          "Pet industry actions, Chase Tail, Tail chasing, Circular shot showing cuteness.",
      },
      {
        label: t("pet_actions.roll_over"),
        value:
          "Pet industry actions, Roll Over, Command rolling, Continuous action showing training.",
      },
      {
        label: t("pet_actions.knead"),
        value:
          "Pet industry actions, Knead, Kitten kneading, Close-up action showing nature.",
      },
      {
        label: t("pet_actions.tease"),
        value:
          "Pet industry actions, Tease, Interactive play, Close-up reaction showing interaction.",
      },
      {
        label: t("pet_actions.sunbathe"),
        value:
          "Pet industry actions, Sunbathe, Lazy sunbathing, Wide shot showing comfort.",
      },
    ],
    [t]
  );

  const clothingActions = useMemo(
    () => [
      {
        label: t("clothing_actions.display"),
        value:
          "Clothing industry actions, Display, Elegant clothing detail display, Slow rotation highlighting fabric texture.",
      },
      {
        label: t("clothing_actions.spin"),
        value:
          "Clothing industry actions, Spin, 360-degree complete presentation, Maintain steady speed highlighting skirt flow.",
      },
      {
        label: t("clothing_actions.catwalk"),
        value:
          "Clothing industry actions, Catwalk, Professional model gait, Chest up head high with even rhythm.",
      },
      {
        label: t("clothing_actions.matching"),
        value:
          "Clothing industry actions, Matching, Clothing matching process, Break down actions highlighting changes.",
      },
      {
        label: t("clothing_actions.try_on"),
        value:
          "Clothing industry actions, Try-on, Try-on display process, Smooth transitions showing contrasts.",
      },
      {
        label: t("clothing_actions.arrange"),
        value:
          "Clothing industry actions, Arrange, Clothing style arrangement, Gentle movements highlighting details.",
      },
      {
        label: t("clothing_actions.fold"),
        value:
          "Clothing industry actions, Fold, Show fabric wrinkle beauty, Close-up shots highlighting material.",
      },
      {
        label: t("clothing_actions.touch"),
        value:
          "Clothing industry actions, Touch, Show fabric texture, Elegant hand movements highlighting feel.",
      },
      {
        label: t("clothing_actions.adjust"),
        value:
          "Clothing industry actions, Adjust, Fine-tune clothing position, Natural movements showing perfect effect.",
      },
      {
        label: t("clothing_actions.stack"),
        value:
          "Clothing industry actions, Stack, Clothing stacking storage, Organized movements showing layers.",
      },
      {
        label: t("clothing_actions.select"),
        value:
          "Clothing industry actions, Select, Clothing selection process, Show thought process highlighting key points.",
      },
      {
        label: t("clothing_actions.compare"),
        value:
          "Clothing industry actions, Compare, Compare different styles, Clear display of differences highlighting features.",
      },
      {
        label: t("clothing_actions.wear"),
        value:
          "Clothing industry actions, Wear, Show wearing process, Continuous movements highlighting convenience.",
      },
      {
        label: t("clothing_actions.place"),
        value:
          "Clothing industry actions, Place, Display arrangement effect, Focus on composition highlighting aesthetics.",
      },
      {
        label: t("clothing_actions.shake"),
        value:
          "Clothing industry actions, Shake, Show fabric drape, Moderate force highlighting flow.",
      },
      {
        label: t("clothing_actions.hang"),
        value:
          "Clothing industry actions, Hang, Show hanging effect, Focus on angles highlighting style.",
      },
      {
        label: t("clothing_actions.color_match"),
        value:
          "Clothing industry actions, Color Match, Color matching display, Focus on lighting highlighting colors.",
      },
      {
        label: t("clothing_actions.button"),
        value:
          "Clothing industry actions, Button, Detail operation display, Close-up shots highlighting convenience.",
      },
      {
        label: t("clothing_actions.zip"),
        value:
          "Clothing industry actions, Zip, Zipper usage display, Smooth operation highlighting quality.",
      },
      {
        label: t("clothing_actions.lace"),
        value:
          "Clothing industry actions, Lace, Lacing process display, Elegant movements highlighting design.",
      },
      {
        label: t("clothing_actions.roll"),
        value:
          "Clothing industry actions, Roll, Sleeve and trouser hem processing, Unified movements highlighting effect.",
      },
      {
        label: t("clothing_actions.sway"),
        value:
          "Clothing industry actions, Sway, Show clothing dynamics, Natural rhythm highlighting flow.",
      },
      {
        label: t("clothing_actions.pull"),
        value:
          "Clothing industry actions, Pull, Show clothing dimension, Moderate movements highlighting silhouette.",
      },
      {
        label: t("clothing_actions.tie"),
        value:
          "Clothing industry actions, Tie, Tie decoration display, Delicate movements highlighting beauty.",
      },
      {
        label: t("clothing_actions.drape"),
        value:
          "Clothing industry actions, Drape, Shawl effect display, Elegant posture highlighting style.",
      },
      {
        label: t("clothing_actions.roll_up"),
        value:
          "Clothing industry actions, Roll Up, Sleeve processing display, Crisp movements highlighting style.",
      },
      {
        label: t("clothing_actions.tiptoe"),
        value:
          "Clothing industry actions, Tiptoe, Show length effect, Maintain balance highlighting proportion.",
      },
      {
        label: t("clothing_actions.jump"),
        value:
          "Clothing industry actions, Jump, Show sports effect, Energetic movements highlighting function.",
      },
      {
        label: t("clothing_actions.stretch_out"),
        value:
          "Clothing industry actions, Stretch Out, Show comfort level, Natural movements highlighting convenience.",
      },
      {
        label: t("clothing_actions.raise_arms"),
        value:
          "Clothing industry actions, Raise Arms, Show activity range, Extended movements highlighting function.",
      },
      {
        label: t("clothing_actions.bend"),
        value:
          "Clothing industry actions, Bend, Show flexibility, Focus on elegance highlighting fit.",
      },
      {
        label: t("clothing_actions.step"),
        value:
          "Clothing industry actions, Step, Show trouser effect, Even steps highlighting structure.",
      },
      {
        label: t("clothing_actions.turn"),
        value:
          "Clothing industry actions, Turn, Show back view, Smooth movements highlighting overall look.",
      },
      {
        label: t("clothing_actions.swing"),
        value:
          "Clothing industry actions, Swing, Show dynamic effect, Natural rhythm highlighting agility.",
      },
      {
        label: t("clothing_actions.squat"),
        value:
          "Clothing industry actions, Squat, Show elasticity, Standard movements highlighting function.",
      },
      {
        label: t("clothing_actions.side_view"),
        value:
          "Clothing industry actions, Side View, Show side effect, Maintain upright highlighting silhouette.",
      },
      {
        label: t("clothing_actions.bend_down"),
        value:
          "Clothing industry actions, Bend Down, Show fit, Natural movements highlighting conformity.",
      },
      {
        label: t("clothing_actions.look_up"),
        value:
          "Clothing industry actions, Look Up, Show collar effect, Beautiful posture highlighting design.",
      },
      {
        label: t("clothing_actions.arm_swing"),
        value:
          "Clothing industry actions, Arm Swing, Show sleeve style, Coordinated movements highlighting flexibility.",
      },
      {
        label: t("clothing_actions.stretch"),
        value:
          "Clothing industry actions, Stretch, Show size fit, Extended movements highlighting comfort.",
      },
      {
        label: t("clothing_actions.fast_walk"),
        value:
          "Clothing industry actions, Fast Walk, Show sports effect, Powerful steps highlighting function.",
      },
      {
        label: t("clothing_actions.slow_move"),
        value:
          "Clothing industry actions, Slow Move, Show detail effect, Gentle movements highlighting texture.",
      },
      {
        label: t("clothing_actions.one_leg"),
        value:
          "Clothing industry actions, One Leg, Show trouser length, Maintain balance highlighting proportion.",
      },
      {
        label: t("clothing_actions.both_hands"),
        value:
          "Clothing industry actions, Both Hands, Show pocket effect, Natural movements highlighting practicality.",
      },
      {
        label: t("clothing_actions.wink"),
        value:
          "Clothing industry actions, Wink, Emphasize expression interaction, Lively expression adding fun.",
      },
      {
        label: t("clothing_actions.point"),
        value:
          "Clothing industry actions, Point, Point out details, Elegant gestures highlighting key points.",
      },
      {
        label: t("clothing_actions.pat"),
        value:
          "Clothing industry actions, Pat, Show fabric structure, Moderate force highlighting texture.",
      },
      {
        label: t("clothing_actions.overall"),
        value:
          "Clothing industry actions, Overall, Complete display effect, Continuous movements highlighting overall look.",
      },
    ],
    [t]
  );

  const advertisingActions = useMemo(
    () => [
      {
        label: t("advertising_actions.high_fashion"),
        value:
          "Advertising industry actions, High Fashion, Elegant slow walk display, Tracking shot with depth of field effects",
      },
      {
        label: t("advertising_actions.vintage_style"),
        value:
          "Advertising industry actions, Vintage Style, Retro looking back gaze, Profile close-up with sepia tones",
      },
      {
        label: t("advertising_actions.street_style"),
        value:
          "Advertising industry actions, Street Style, Free casual movement, Circular camera movement with high saturation",
      },
      {
        label: t("advertising_actions.tech_style"),
        value:
          "Advertising industry actions, Tech Style, Smooth action display, Multi-camera switching with cool tones",
      },
      {
        label: t("advertising_actions.chinese_style"),
        value:
          "Advertising industry actions, Chinese Style, Oriental aesthetic turn, Traditional shots with ink painting style",
      },
      {
        label: t("advertising_actions.sports_style"),
        value:
          "Advertising industry actions, Sports Style, Dynamic jumping moment, Slow motion with high contrast",
      },
      {
        label: t("advertising_actions.literary_style"),
        value:
          "Advertising industry actions, Literary Style, Gentle hair flip close-up, Slow motion with warm artistic tones",
      },
      {
        label: t("advertising_actions.fashion_style"),
        value:
          "Advertising industry actions, Fashion Style, Elegant stretching pose, Full body long shot with high-end feel",
      },
      {
        label: t("advertising_actions.business_style"),
        value:
          "Advertising industry actions, Business Style, Professional camera gaze, Face close-up with sharp lighting",
      },
      {
        label: t("advertising_actions.japanese_style"),
        value:
          "Advertising industry actions, Japanese Style, Fresh running pose, Side tracking shot with high key",
      },
      {
        label: t("advertising_actions.street_fashion"),
        value:
          "Advertising industry actions, Street Fashion, Cool hair flip action, Hand movement with high saturation",
      },
      {
        label: t("advertising_actions.retro_style"),
        value:
          "Advertising industry actions, Retro Style, Nostalgic walking pace, Full body tracking with film texture",
      },
      {
        label: t("advertising_actions.tech_business"),
        value:
          "Advertising industry actions, Tech Business, Futuristic hand gesture, Close-up shot with blue tones",
      },
      {
        label: t("advertising_actions.urban_style"),
        value:
          "Advertising industry actions, Urban Style, Trendy eyebrow movement, Face close-up with high contrast",
      },
      {
        label: t("advertising_actions.art_style"),
        value:
          "Advertising industry actions, Art Style, Artistic listening pose, Profile close-up with soft lighting",
      },
      {
        label: t("advertising_actions.luxury_style"),
        value:
          "Advertising industry actions, Luxury Style, High-end chin rest pose, 45-degree close-up with cool tones",
      },
      {
        label: t("advertising_actions.dynamic_style"),
        value:
          "Advertising industry actions, Dynamic Style, Energetic stretching action, Hand close-up with strong motion",
      },
      {
        label: t("advertising_actions.oriental_style"),
        value:
          "Advertising industry actions, Oriental Style, Traditional bowing action, Full scene composition with ink painting style",
      },
      {
        label: t("advertising_actions.j_fashion"),
        value:
          "Advertising industry actions, J-fashion, Fresh swaying pose, Full body shot with high brightness",
      },
      {
        label: t("advertising_actions.western_style"),
        value:
          "Advertising industry actions, Western Style, Casual leaning pose, Full body composition with vintage feel",
      },
      {
        label: t("advertising_actions.high_street"),
        value:
          "Advertising industry actions, High Street, Trendy standing action, Side shot with strong contrast",
      },
      {
        label: t("advertising_actions.corporate"),
        value:
          "Advertising industry actions, Corporate, Professional turn action, Back detail shot with cool tones",
      },
      {
        label: t("advertising_actions.fashion_forward"),
        value:
          "Advertising industry actions, Fashion Forward, Fashion looking pose, Face tracking with high-end feel",
      },
      {
        label: t("advertising_actions.sports_dynamic"),
        value:
          "Advertising industry actions, Sports Dynamic, Energetic shoulder movement, Upper body shot with dynamic feel",
      },
      {
        label: t("advertising_actions.artistic_style"),
        value:
          "Advertising industry actions, Artistic Style, Artistic pause moment, Full body freeze with light and shadow",
      },
      {
        label: t("advertising_actions.j_beauty"),
        value:
          "Advertising industry actions, J-beauty, Fresh smile with hand, Hand and face close-up with warm tones",
      },
      {
        label: t("advertising_actions.street_wave"),
        value:
          "Advertising industry actions, Street Wave, Trendy hand wave action, Hand movement close-up with street feel",
      },
      {
        label: t("advertising_actions.literary_art"),
        value:
          "Advertising industry actions, Literary Art, Artistic gazing pose, Profile close-up with soft lighting",
      },
      {
        label: t("advertising_actions.luxury_turn"),
        value:
          "Advertising industry actions, Luxury Turn, High-end turning action, Full body shot with quality feel",
      },
      {
        label: t("advertising_actions.trendy_walk"),
        value:
          "Advertising industry actions, Trendy Walk, Casual walking pose, Full body tracking with street style",
      },
      {
        label: t("advertising_actions.modern_twist"),
        value:
          "Advertising industry actions, Modern Twist, Trendy turn and jump, Slow motion photography with dynamic emphasis",
      },
      {
        label: t("advertising_actions.tech_down"),
        value:
          "Advertising industry actions, Tech Down, Futuristic looking down pose, Top-down close-up with tech blue tones",
      },
      {
        label: t("advertising_actions.luxury_stretch"),
        value:
          "Advertising industry actions, Luxury Stretch, Elegant stretching pose, Full body long shot with premium grey tones",
      },
      {
        label: t("advertising_actions.street_stay"),
        value:
          "Advertising industry actions, Street Stay, Trendy staying pose, Full body composition with street feel",
      },
      {
        label: t("advertising_actions.sport_leap"),
        value:
          "Advertising industry actions, Sport Leap, Energetic jumping action, Continuous motion with sports feel",
      },
      {
        label: t("advertising_actions.oriental_wave"),
        value:
          "Advertising industry actions, Oriental Wave, Traditional hand gesture display, Hand close-up with ink painting style",
      },
      {
        label: t("advertising_actions.art_light"),
        value:
          "Advertising industry actions, Art Light, Light and shadow artistic action, Silhouette effect with artistic feel",
      },
      {
        label: t("advertising_actions.business_think"),
        value:
          "Advertising industry actions, Business Think, Professional thinking pose, Face close-up with business feel",
      },
      {
        label: t("advertising_actions.j_style_float"),
        value:
          "Advertising industry actions, J-style Float, Fresh floating pose, Side tracking with fresh style",
      },
      {
        label: t("advertising_actions.euro_slow"),
        value:
          "Advertising industry actions, Euro Slow, Vintage rotating action, Circular shooting with vintage feel",
      },
      {
        label: t("advertising_actions.high_street_lean"),
        value:
          "Advertising industry actions, High Street Lean, Trendy leaning action, Side shot with street style",
      },
      {
        label: t("advertising_actions.fashion_gaze"),
        value:
          "Advertising industry actions, Fashion Gaze, High-end gazing action, Face close-up with fashion feel",
      },
      {
        label: t("advertising_actions.sport_swing"),
        value:
          "Advertising industry actions, Sport Swing, Dynamic swaying action, Full body shot with sports feel",
      },
      {
        label: t("advertising_actions.art_walk"),
        value:
          "Advertising industry actions, Art Walk, Artistic walking style, Tracking push with artistic feel",
      },
      {
        label: t("advertising_actions.tech_jump"),
        value:
          "Advertising industry actions, Tech Jump, Futuristic jumping action, Continuous shooting with tech feel",
      },
      {
        label: t("advertising_actions.luxury_reach"),
        value:
          "Advertising industry actions, Luxury Reach, Elegant arm extension, Full body long shot with luxury feel",
      },
      {
        label: t("advertising_actions.retro_turn"),
        value:
          "Advertising industry actions, Retro Turn, Nostalgic turning action, Side shot with vintage tones",
      },
      {
        label: t("advertising_actions.street_chase"),
        value:
          "Advertising industry actions, Street Chase, Trendy chasing action, Side tracking with strong dynamics",
      },
      {
        label: t("advertising_actions.j_style_glide"),
        value:
          "Advertising industry actions, J-style Glide, Healing gliding action, Full body tracking with fresh style",
      },
      {
        label: t("advertising_actions.oriental_gaze"),
        value:
          "Advertising industry actions, Oriental Gaze, Traditional aesthetic eye expression, Face close-up with cultural style",
      },
    ],
    [t]
  );

  const cosmeticsActions = useMemo(
    () => [
      {
        label: t("cosmetics_actions.pat"),
        value:
          "Cosmetics industry actions, Pat, Gentle patting absorption action, Close-up shot highlighting gentle technique",
      },
      {
        label: t("cosmetics_actions.spread"),
        value:
          "Cosmetics industry actions, Spread, Even product application, Showcase spreading range and extensibility",
      },
      {
        label: t("cosmetics_actions.massage"),
        value:
          "Cosmetics industry actions, Massage, Professional massage technique, Close-up of hand movements showing expertise",
      },
      {
        label: t("cosmetics_actions.dot"),
        value:
          "Cosmetics industry actions, Dot, Dotted even application, Highlight product amount control",
      },
      {
        label: t("cosmetics_actions.mix"),
        value:
          "Cosmetics industry actions, Mix, Product blending process, Close-up of product mixing process",
      },
      {
        label: t("cosmetics_actions.display"),
        value:
          "Cosmetics industry actions, Display, Product appearance showcase, 360-degree rotation of packaging",
      },
      {
        label: t("cosmetics_actions.squeeze"),
        value:
          "Cosmetics industry actions, Squeeze, Product amount control, Demonstrate appropriate usage amount",
      },
      {
        label: t("cosmetics_actions.drop"),
        value:
          "Cosmetics industry actions, Drop, Liquid dropping effect, Close-up of dropping moment",
      },
      {
        label: t("cosmetics_actions.press"),
        value:
          "Cosmetics industry actions, Press, Deep massage technique, Demonstrate professional massage method",
      },
      {
        label: t("cosmetics_actions.brush"),
        value:
          "Cosmetics industry actions, Brush, Makeup brush usage, Show brush application technique",
      },
      {
        label: t("cosmetics_actions.blend"),
        value:
          "Cosmetics industry actions, Blend, Soft transition effect, Close-up of blending technique",
      },
      {
        label: t("cosmetics_actions.spray"),
        value:
          "Cosmetics industry actions, Spray, Spray application method, Show spray distance control",
      },
      {
        label: t("cosmetics_actions.apply"),
        value:
          "Cosmetics industry actions, Apply, Basic application action, Show even application coverage",
      },
      {
        label: t("cosmetics_actions.remove"),
        value:
          "Cosmetics industry actions, Remove, Makeup removal action, Show thorough cleansing process",
      },
      {
        label: t("cosmetics_actions.circle"),
        value:
          "Cosmetics industry actions, Circle, Circular massage technique, Show professional massage path",
      },
      {
        label: t("cosmetics_actions.tap"),
        value:
          "Cosmetics industry actions, Tap, Product absorption promotion, Show tapping intensity control",
      },
      {
        label: t("cosmetics_actions.rub"),
        value:
          "Cosmetics industry actions, Rub, Gentle rubbing action, Show technique gentleness",
      },
      {
        label: t("cosmetics_actions.lift"),
        value:
          "Cosmetics industry actions, Lift, Facial lifting technique, Show lifting effect",
      },
      {
        label: t("cosmetics_actions.draw"),
        value:
          "Cosmetics industry actions, Draw, Contour line drawing, Show line smoothness",
      },
      {
        label: t("cosmetics_actions.sweep"),
        value:
          "Cosmetics industry actions, Sweep, Horizontal sweeping application, Show evenness control",
      },
      {
        label: t("cosmetics_actions.apply_mask"),
        value:
          "Cosmetics industry actions, Apply Mask, Face mask application method, Show mask application technique",
      },
      {
        label: t("cosmetics_actions.absorb"),
        value:
          "Cosmetics industry actions, Absorb, Excess oil absorption, Show oil absorption effect",
      },
      {
        label: t("cosmetics_actions.outline"),
        value:
          "Cosmetics industry actions, Outline, Contour line drawing, Show precision",
      },
      {
        label: t("cosmetics_actions.press"),
        value:
          "Cosmetics industry actions, Press, Pressing makeup application, Show even application",
      },
      {
        label: t("cosmetics_actions.spread_out"),
        value:
          "Cosmetics industry actions, Spread Out, Even product spreading, Show spreading range",
      },
      {
        label: t("cosmetics_actions.set"),
        value:
          "Cosmetics industry actions, Set, Setting makeup technique, Show setting effect",
      },
      {
        label: t("cosmetics_actions.touch_up"),
        value:
          "Cosmetics industry actions, Touch Up, Local touch-up technique, Show touch-up skill",
      },
      {
        label: t("cosmetics_actions.layer"),
        value:
          "Cosmetics industry actions, Layer, Product layering application, Show layering effect",
      },
      {
        label: t("cosmetics_actions.blend"),
        value:
          "Cosmetics industry actions, Blend, Product blending process, Show blending technique",
      },
      {
        label: t("cosmetics_actions.gradient"),
        value:
          "Cosmetics industry actions, Gradient, Color gradient effect, Show natural transition",
      },
      {
        label: t("cosmetics_actions.line"),
        value:
          "Cosmetics industry actions, Line, Precise line drawing, Show line precision",
      },
      {
        label: t("cosmetics_actions.fill"),
        value:
          "Cosmetics industry actions, Fill, Area filling technique, Show natural filling",
      },
      {
        label: t("cosmetics_actions.blur"),
        value:
          "Cosmetics industry actions, Blur, Edge blurring effect, Show blurring technique",
      },
      {
        label: t("cosmetics_actions.brush_off"),
        value:
          "Cosmetics industry actions, Brush Off, Excess product removal, Show cleaning technique",
      },
      {
        label: t("cosmetics_actions.press_point"),
        value:
          "Cosmetics industry actions, Press Point, Acupoint massage technique, Show massage points",
      },
      {
        label: t("cosmetics_actions.smooth"),
        value:
          "Cosmetics industry actions, Smooth, Even application action, Show spreading evenness",
      },
      {
        label: t("cosmetics_actions.press_in"),
        value:
          "Cosmetics industry actions, Press In, Deep pressing technique, Show pressing intensity",
      },
      {
        label: t("cosmetics_actions.pull_up"),
        value:
          "Cosmetics industry actions, Pull Up, Facial lifting action, Show lifting effect",
      },
      {
        label: t("cosmetics_actions.sweep"),
        value:
          "Cosmetics industry actions, Sweep, Gentle sweeping application, Show light technique",
      },
      {
        label: t("cosmetics_actions.roll"),
        value:
          "Cosmetics industry actions, Roll, Massage device usage, Show usage method",
      },
      {
        label: t("cosmetics_actions.mist"),
        value:
          "Cosmetics industry actions, Mist, Spray usage technique, Show spraying distance",
      },
      {
        label: t("cosmetics_actions.rub"),
        value:
          "Cosmetics industry actions, Rub, Gentle friction action, Show intensity control",
      },
      {
        label: t("cosmetics_actions.apply"),
        value:
          "Cosmetics industry actions, Apply, Even application action, Show application technique",
      },
      {
        label: t("cosmetics_actions.scrape"),
        value:
          "Cosmetics industry actions, Scrape, Mask scraping action, Show evenness",
      },
      {
        label: t("cosmetics_actions.press_down"),
        value:
          "Cosmetics industry actions, Press Down, Essence pressing technique, Show pressing technique",
      },
      {
        label: t("cosmetics_actions.pat_and_spread"),
        value:
          "Cosmetics industry actions, Pat & Spread, Combined patting and spreading, Show absorption process",
      },
      {
        label: t("cosmetics_actions.pinch"),
        value:
          "Cosmetics industry actions, Pinch, Facial lifting massage, Show massage technique",
      },
      {
        label: t("cosmetics_actions.squeeze_point"),
        value:
          "Cosmetics industry actions, Squeeze Point, Usage amount control, Show amount control",
      },
      {
        label: t("cosmetics_actions.circle_draw"),
        value:
          "Cosmetics industry actions, Circle Draw, Circular application technique, Show massage path",
      },
      {
        label: t("cosmetics_actions.even_out"),
        value:
          "Cosmetics industry actions, Even Out, Even product spreading, Show evenness",
      },
    ],
    [t]
  );

  const maternalInfantActions = useMemo(
    () => [
      {
        label: t("maternal_infant_actions.display"),
        value:
          "Maternal and Infant industry actions, Display, Product overall display, 360-degree rotation highlighting details",
      },
      {
        label: t("maternal_infant_actions.unbox"),
        value:
          "Maternal and Infant industry actions, Unbox, Package unboxing process, Close-up of packaging showing quality",
      },
      {
        label: t("maternal_infant_actions.try_out"),
        value:
          "Maternal and Infant industry actions, Try Out, Usage effect demonstration, Real usage showing convenience",
      },
      {
        label: t("maternal_infant_actions.compare"),
        value:
          "Maternal and Infant industry actions, Compare, Product comparison display, Split-screen showing advantages",
      },
      {
        label: t("maternal_infant_actions.clean"),
        value:
          "Maternal and Infant industry actions, Clean, Cleaning and maintenance display, Clear steps showing simplicity",
      },
      {
        label: t("maternal_infant_actions.sterilize"),
        value:
          "Maternal and Infant industry actions, Sterilize, Sterilization process display, Professional method showing safety",
      },
      {
        label: t("maternal_infant_actions.store"),
        value:
          "Maternal and Infant industry actions, Store, Storage method display, Space utilization showing technique",
      },
      {
        label: t("maternal_infant_actions.test"),
        value:
          "Maternal and Infant industry actions, Test, Safety testing display, Professional testing showing quality",
      },
      {
        label: t("maternal_infant_actions.assemble"),
        value:
          "Maternal and Infant industry actions, Assemble, Assembly process display, Detailed steps showing simplicity",
      },
      {
        label: t("maternal_infant_actions.adjust"),
        value:
          "Maternal and Infant industry actions, Adjust, Usage adjustment display, Operation demonstration showing convenience",
      },
      {
        label: t("maternal_infant_actions.feed"),
        value:
          "Maternal and Infant industry actions, Feed, Feeding method display, Correct posture showing scientific approach",
      },
      {
        label: t("maternal_infant_actions.care"),
        value:
          "Maternal and Infant industry actions, Care, Daily care display, Detailed care showing love",
      },
      {
        label: t("maternal_infant_actions.change_diaper"),
        value:
          "Maternal and Infant industry actions, Change Diaper, Diaper changing technique display, Standard actions showing proficiency",
      },
      {
        label: t("maternal_infant_actions.mix"),
        value:
          "Maternal and Infant industry actions, Mix, Formula mixing display, Standard process showing professionalism",
      },
      {
        label: t("maternal_infant_actions.temperature"),
        value:
          "Maternal and Infant industry actions, Temperature, Temperature measurement method, Correct usage showing accuracy",
      },
      {
        label: t("maternal_infant_actions.massage"),
        value:
          "Maternal and Infant industry actions, Massage, Massage technique display, Professional technique showing gentleness",
      },
      {
        label: t("maternal_infant_actions.wear"),
        value:
          "Maternal and Infant industry actions, Wear, Wearing method display, Easy operation showing convenience",
      },
      {
        label: t("maternal_infant_actions.protect"),
        value:
          "Maternal and Infant industry actions, Protect, Protection function display, Safety test showing effectiveness",
      },
      {
        label: t("maternal_infant_actions.storage"),
        value:
          "Maternal and Infant industry actions, Storage, Storage method display, Correct method showing professionalism",
      },
      {
        label: t("maternal_infant_actions.ratio"),
        value:
          "Maternal and Infant industry actions, Ratio, Ratio method display, Precise measurement showing scientific approach",
      },
      {
        label: t("maternal_infant_actions.keep_warm"),
        value:
          "Maternal and Infant industry actions, Keep Warm, Heat retention effect display, Time comparison showing performance",
      },
      {
        label: t("maternal_infant_actions.remove"),
        value:
          "Maternal and Infant industry actions, Remove, Stain removal function display, Effect comparison showing effectiveness",
      },
      {
        label: t("maternal_infant_actions.fold"),
        value:
          "Maternal and Infant industry actions, Fold, Folding method display, Clear steps showing portability",
      },
      {
        label: t("maternal_infant_actions.clean"),
        value:
          "Maternal and Infant industry actions, Clean, Cleaning process display, Detail display showing thoroughness",
      },
      {
        label: t("maternal_infant_actions.leak_proof"),
        value:
          "Maternal and Infant industry actions, Leak-proof, Leakage prevention effect display, Test display showing reliability",
      },
      {
        label: t("maternal_infant_actions.sterilize"),
        value:
          "Maternal and Infant industry actions, Sterilize, Sterilization effect display, Professional testing showing safety",
      },
      {
        label: t("maternal_infant_actions.protect"),
        value:
          "Maternal and Infant industry actions, Protect, Protection function display, Comparison display showing effect",
      },
      {
        label: t("maternal_infant_actions.absorb"),
        value:
          "Maternal and Infant industry actions, Absorb, Water absorption effect display, Practical test showing performance",
      },
      {
        label: t("maternal_infant_actions.fix"),
        value:
          "Maternal and Infant industry actions, Fix, Fixing method display, Operation demonstration showing stability",
      },
      {
        label: t("maternal_infant_actions.anti_slip"),
        value:
          "Maternal and Infant industry actions, Anti-slip, Anti-slip effect display, Test display showing safety",
      },
      {
        label: t("maternal_infant_actions.temperature"),
        value:
          "Maternal and Infant industry actions, Temperature, Temperature adjustment display, Operation demonstration showing precision",
      },
      {
        label: t("maternal_infant_actions.install"),
        value:
          "Maternal and Infant industry actions, Install, Installation process display, Clear steps showing simplicity",
      },
      {
        label: t("maternal_infant_actions.disassemble"),
        value:
          "Maternal and Infant industry actions, Disassemble, Disassembly method display, Operation demonstration showing convenience",
      },
      {
        label: t("maternal_infant_actions.cool"),
        value:
          "Maternal and Infant industry actions, Cool, Cooling effect display, Time comparison showing speed",
      },
      {
        label: t("maternal_infant_actions.fresh"),
        value:
          "Maternal and Infant industry actions, Fresh, Freshness preservation effect display, Time effect comparison showing durability",
      },
      {
        label: t("maternal_infant_actions.guard"),
        value:
          "Maternal and Infant industry actions, Guard, Protection effect display, Safety test showing reliability",
      },
      {
        label: t("maternal_infant_actions.adjust"),
        value:
          "Maternal and Infant industry actions, Adjust, Adjustment method display, Operation demonstration showing flexibility",
      },
      {
        label: t("maternal_infant_actions.measure"),
        value:
          "Maternal and Infant industry actions, Measure, Measurement method display, Accurate usage showing professionalism",
      },
      {
        label: t("maternal_infant_actions.dust_proof"),
        value:
          "Maternal and Infant industry actions, Dust-proof, Dust prevention effect display, Effect display showing cleanliness",
      },
      {
        label: t("maternal_infant_actions.maintain"),
        value:
          "Maternal and Infant industry actions, Maintain, Maintenance method display, Step display showing simplicity",
      },
      {
        label: t("maternal_infant_actions.preheat"),
        value:
          "Maternal and Infant industry actions, Preheat, Preheating process display, Time display showing speed",
      },
      {
        label: t("maternal_infant_actions.silence"),
        value:
          "Maternal and Infant industry actions, Silence, Noise reduction effect display, Comparison display showing quietness",
      },
      {
        label: t("maternal_infant_actions.waterproof"),
        value:
          "Maternal and Infant industry actions, Waterproof, Waterproof effect display, Test display showing reliability",
      },
      {
        label: t("maternal_infant_actions.breathable"),
        value:
          "Maternal and Infant industry actions, Breathable, Breathability effect display, Test display showing comfort",
      },
      {
        label: t("maternal_infant_actions.deodorize"),
        value:
          "Maternal and Infant industry actions, Deodorize, Deodorization effect display, Comparison display showing effect",
      },
      {
        label: t("maternal_infant_actions.monitor"),
        value:
          "Maternal and Infant industry actions, Monitor, Monitoring function display, Data display showing accuracy",
      },
      {
        label: t("maternal_infant_actions.position"),
        value:
          "Maternal and Infant industry actions, Position, Positioning method display, Operation demonstration showing precision",
      },
      {
        label: t("maternal_infant_actions.drop_proof"),
        value:
          "Maternal and Infant industry actions, Drop-proof, Drop resistance effect display, Test display showing durability",
      },
      {
        label: t("maternal_infant_actions.clean_up"),
        value:
          "Maternal and Infant industry actions, Clean Up, Cleanup method display, Step display showing convenience",
      },
      {
        label: t("maternal_infant_actions.sanitize"),
        value:
          "Maternal and Infant industry actions, Sanitize, Sanitization effect display, Professional testing showing safety",
      },
    ],
    [t]
  );

  const watchActions = useMemo(
    () => [
      {
        label: t("watch_actions.display"),
        value:
          "Watch industry actions, Display, Elegant watch display, Rotating display highlighting overall aesthetics",
      },
      {
        label: t("watch_actions.wear"),
        value:
          "Watch industry actions, Wear, Watch wearing demonstration, Wrist close-up showing elegance",
      },
      {
        label: t("watch_actions.rotate"),
        value:
          "Watch industry actions, Rotate, 360-degree display, Stable rotation capturing light and shadow",
      },
      {
        label: t("watch_actions.adjust_time"),
        value:
          "Watch industry actions, Adjust Time, Time adjustment, Close-up shot showing professionalism",
      },
      {
        label: t("watch_actions.unbox"),
        value:
          "Watch industry actions, Unbox, Unboxing display, Slow motion emphasizing ceremony",
      },
      {
        label: t("watch_actions.try_on"),
        value:
          "Watch industry actions, Try On, Try-on effect, Multiple angles showing matching",
      },
      {
        label: t("watch_actions.polish"),
        value:
          "Watch industry actions, Polish, Maintenance process, Detail close-up showing expertise",
      },
      {
        label: t("watch_actions.compare"),
        value:
          "Watch industry actions, Compare, Product comparison, Side-by-side display highlighting features",
      },
      {
        label: t("watch_actions.match"),
        value:
          "Watch industry actions, Match, Outfit matching, Overall coordination showing taste",
      },
      {
        label: t("watch_actions.disassemble"),
        value:
          "Watch industry actions, Disassemble, Disassembly display, Component close-up showing craftsmanship",
      },
      {
        label: t("watch_actions.assemble"),
        value:
          "Watch industry actions, Assemble, Assembly process, Process close-up showing expertise",
      },
      {
        label: t("watch_actions.clean"),
        value:
          "Watch industry actions, Clean, Cleaning maintenance, Detail close-up showing method",
      },
      {
        label: t("watch_actions.test"),
        value:
          "Watch industry actions, Test, Function testing, Professional equipment showing quality",
      },
      {
        label: t("watch_actions.change_strap"),
        value:
          "Watch industry actions, Change Strap, Strap replacement, Detail movement showing technique",
      },
      {
        label: t("watch_actions.water_test"),
        value:
          "Watch industry actions, Water Test, Water resistance testing, Process close-up showing performance",
      },
      {
        label: t("watch_actions.adjust"),
        value:
          "Watch industry actions, Adjust, Size adjustment, Hand close-up showing technique",
      },
      {
        label: t("watch_actions.authenticate"),
        value:
          "Watch industry actions, Authenticate, Authenticity verification, Detail comparison showing expertise",
      },
      {
        label: t("watch_actions.package"),
        value:
          "Watch industry actions, Package, Packaging display, Full process showing quality",
      },
      {
        label: t("watch_actions.light_play"),
        value:
          "Watch industry actions, Light Play, Light effect, Light changes showing texture",
      },
      {
        label: t("watch_actions.explain"),
        value:
          "Watch industry actions, Explain, Function explanation, Clear display with professional commentary",
      },
      {
        label: t("watch_actions.compare"),
        value:
          "Watch industry actions, Compare, Model comparison, Dual camera showing differences",
      },
      {
        label: t("watch_actions.customize"),
        value:
          "Watch industry actions, Customize, Customization process, Full recording showing uniqueness",
      },
      {
        label: t("watch_actions.regulate"),
        value:
          "Watch industry actions, Regulate, Accuracy adjustment, Professional tools showing technique",
      },
      {
        label: t("watch_actions.test_motion"),
        value:
          "Watch industry actions, Test Motion, Vibration testing, Professional equipment showing quality",
      },
      {
        label: t("watch_actions.store"),
        value:
          "Watch industry actions, Store, Storage display, Neat arrangement showing collection",
      },
      {
        label: t("watch_actions.set_hands"),
        value:
          "Watch industry actions, Set Hands, Hand adjustment, Action close-up showing detail",
      },
      {
        label: t("watch_actions.anti_magnetic"),
        value:
          "Watch industry actions, Anti-magnetic, Anti-magnetic testing, Professional equipment showing performance",
      },
      {
        label: t("watch_actions.timing"),
        value:
          "Watch industry actions, Timing, Timing function, Function display showing precision",
      },
      {
        label: t("watch_actions.shock_resist"),
        value:
          "Watch industry actions, Shock Resist, Shock resistance display, Testing process showing performance",
      },
      {
        label: t("watch_actions.power_reserve"),
        value:
          "Watch industry actions, Power Reserve, Power display, Process close-up showing principle",
      },
      {
        label: t("watch_actions.waterproof"),
        value:
          "Watch industry actions, Waterproof, Water resistance function, Special effect showing performance",
      },
      {
        label: t("watch_actions.breakdown"),
        value:
          "Watch industry actions, Breakdown, Structure breakdown, Detail close-up showing craftsmanship",
      },
      {
        label: t("watch_actions.light_adjust"),
        value:
          "Watch industry actions, Light Adjust, Night light display, Dark environment showing effect",
      },
      {
        label: t("watch_actions.magnetic_test"),
        value:
          "Watch industry actions, Magnetic Test, Magnetic field testing, Professional equipment showing performance",
      },
      {
        label: t("watch_actions.stamp"),
        value:
          "Watch industry actions, Stamp, Stamp display, Detail close-up showing quality",
      },
      {
        label: t("watch_actions.engrave"),
        value:
          "Watch industry actions, Engrave, Engraving process, Process close-up showing craftsmanship",
      },
      {
        label: t("watch_actions.pair"),
        value:
          "Watch industry actions, Pair, Pairing display, Dual watch showing matching",
      },
      {
        label: t("watch_actions.mirror_play"),
        value:
          "Watch industry actions, Mirror Play, Mirror effect, Light changes showing texture",
      },
      {
        label: t("watch_actions.bezel_turn"),
        value:
          "Watch industry actions, Bezel Turn, Bezel rotation, Action close-up showing function",
      },
      {
        label: t("watch_actions.step_count"),
        value:
          "Watch industry actions, Step Count, Step counting function, Function display showing intelligence",
      },
      {
        label: t("watch_actions.charging"),
        value:
          "Watch industry actions, Charging, Charging process, Process close-up showing convenience",
      },
      {
        label: t("watch_actions.connect"),
        value:
          "Watch industry actions, Connect, Smart connection, Operation display showing function",
      },
      {
        label: t("watch_actions.heart_rate"),
        value:
          "Watch industry actions, Heart Rate, Heart rate monitoring, Function display showing technology",
      },
      {
        label: t("watch_actions.alert"),
        value:
          "Watch industry actions, Alert, Alert function, Function display showing practicality",
      },
      {
        label: t("watch_actions.unlock"),
        value:
          "Watch industry actions, Unlock, Unlock display, Operation close-up showing convenience",
      },
      {
        label: t("watch_actions.sync"),
        value:
          "Watch industry actions, Sync, Data synchronization, Function display showing convenience",
      },
      {
        label: t("watch_actions.locate"),
        value:
          "Watch industry actions, Locate, Location function, Function display showing practicality",
      },
      {
        label: t("watch_actions.payment"),
        value:
          "Watch industry actions, Payment, Payment function, Operation display showing convenience",
      },
      {
        label: t("watch_actions.alarm"),
        value:
          "Watch industry actions, Alarm, Alarm setting, Operation display showing practicality",
      },
      {
        label: t("watch_actions.sleep_mode"),
        value:
          "Watch industry actions, Sleep Mode, Sleep function, Function display showing energy efficiency",
      },
    ],
    [t]
  );

  const danceActions = useMemo(
    () => [
      {
        label: t("dance_actions.hip_swing"),
        value:
          "Dance industry actions, Hip Swing, Rhythmic hip movement, Side 45-degree shot highlighting rhythm",
      },
      {
        label: t("dance_actions.waist_twist"),
        value:
          "Dance industry actions, Waist Twist, Waist twisting movement, Full body shot showing curves",
      },
      {
        label: t("dance_actions.head_nod"),
        value:
          "Dance industry actions, Head Nod, Front-back head movement, Upper body close-up showing rhythm",
      },
      {
        label: t("dance_actions.hair_flip"),
        value:
          "Dance industry actions, Hair Flip, Rhythmic hair flipping, Slow motion capture showing dynamics",
      },
      {
        label: t("dance_actions.leg_kick"),
        value:
          "Dance industry actions, Leg Kick, Leg kicking display, Full body shot showing strength",
      },
      {
        label: t("dance_actions.spin"),
        value:
          "Dance industry actions, Spin, In-place rotation, Panoramic shot showing fluidity",
      },
      {
        label: t("dance_actions.wave_arms"),
        value:
          "Dance industry actions, Wave Arms, Arm wave rhythm, Upper body close-up showing rhythm",
      },
      {
        label: t("dance_actions.shoulder_shake"),
        value:
          "Dance industry actions, Shoulder Shake, Rhythmic shoulder movement, Upper body close-up highlighting beat",
      },
      {
        label: t("dance_actions.head_turn"),
        value:
          "Dance industry actions, Head Turn, Left-right head rotation, Face close-up showing expression",
      },
      {
        label: t("dance_actions.hand_wave"),
        value:
          "Dance industry actions, Hand Wave, Hand waving rhythm, Hand close-up showing details",
      },
      {
        label: t("dance_actions.hip_lock"),
        value:
          "Dance industry actions, Hip Lock, Hip locking movement, Lower body close-up showing technique",
      },
      {
        label: t("dance_actions.jump"),
        value:
          "Dance industry actions, Jump, Overall jumping action, Full body shot showing energy",
      },
      {
        label: t("dance_actions.chest_pop"),
        value:
          "Dance industry actions, Chest Pop, Chest front-back rhythm, Upper body close-up showing rhythm",
      },
      {
        label: t("dance_actions.swing"),
        value:
          "Dance industry actions, Swing, Overall swaying rhythm, Full body shot showing coordination",
      },
      {
        label: t("dance_actions.beat_step"),
        value:
          "Dance industry actions, Beat Step, Precise beat stepping, Foot close-up showing rhythm",
      },
      {
        label: t("dance_actions.hand_slide"),
        value:
          "Dance industry actions, Hand Slide, Arm sliding movement, Arm close-up showing fluidity",
      },
      {
        label: t("dance_actions.shoulder_drop"),
        value:
          "Dance industry actions, Shoulder Drop, Shoulder dropping movement, Upper body close-up showing strength",
      },
      {
        label: t("dance_actions.hair_wave"),
        value:
          "Dance industry actions, Hair Wave, Hair flowing movement, Head close-up showing rhythm",
      },
      {
        label: t("dance_actions.freeze"),
        value:
          "Dance industry actions, Freeze, Sudden pose freeze, Full body shot showing effect",
      },
      {
        label: t("dance_actions.cross_step"),
        value:
          "Dance industry actions, Cross Step, Cross stepping movement, Lower body close-up showing technique",
      },
      {
        label: t("dance_actions.circle"),
        value:
          "Dance industry actions, Circle, Circle walking combination, Panoramic shot showing fluidity",
      },
      {
        label: t("dance_actions.leg_shake"),
        value:
          "Dance industry actions, Leg Shake, Leg shaking rhythm, Leg close-up showing rhythm",
      },
      {
        label: t("dance_actions.hand_push"),
        value:
          "Dance industry actions, Hand Push, Hand pushing movement, Hand close-up showing strength",
      },
      {
        label: t("dance_actions.hip_swing_hair"),
        value:
          "Dance industry actions, Hip Swing Hair, Hip swing with hair flip, Full body shot showing charm",
      },
      {
        label: t("dance_actions.jump_turn"),
        value:
          "Dance industry actions, Jump Turn, Jumping with rotation, Full body shot showing technique",
      },
      {
        label: t("dance_actions.chest_point"),
        value:
          "Dance industry actions, Chest Point, Chest pointing rhythm, Upper body close-up showing rhythm",
      },
      {
        label: t("dance_actions.hand_wave_spin"),
        value:
          "Dance industry actions, Hand Wave Spin, Hand wave with spin, Full body shot showing coordination",
      },
      {
        label: t("dance_actions.toe_point"),
        value:
          "Dance industry actions, Toe Point, Toe pointing movement, Foot close-up showing grace",
      },
      {
        label: t("dance_actions.head_shake"),
        value:
          "Dance industry actions, Head Shake, Head shaking movement, Head close-up showing expression",
      },
      {
        label: t("dance_actions.side_step_hip"),
        value:
          "Dance industry actions, Side Step Hip, Side step with hip movement, Full body shot showing rhythm",
      },
      {
        label: t("dance_actions.hand_raise"),
        value:
          "Dance industry actions, Hand Raise, Double hand raising, Upper body close-up showing strength",
      },
      {
        label: t("dance_actions.hip_twist_shoulder"),
        value:
          "Dance industry actions, Hip Twist Shoulder, Hip twist with shoulder shake, Full body shot showing rhythm",
      },
      {
        label: t("dance_actions.tiptoe_spin"),
        value:
          "Dance industry actions, Tiptoe Spin, Tiptoe spinning movement, Full body shot showing grace",
      },
      {
        label: t("dance_actions.hand_wave_waist"),
        value:
          "Dance industry actions, Hand Wave Waist, Hand wave with waist twist, Full body shot showing coordination",
      },
      {
        label: t("dance_actions.cross_hip"),
        value:
          "Dance industry actions, Cross Hip, Cross step with hip movement, Full body shot showing technique",
      },
      {
        label: t("dance_actions.hair_flip_turn"),
        value:
          "Dance industry actions, Hair Flip Turn, Hair flip with turn, Full body shot showing dynamics",
      },
      {
        label: t("dance_actions.body_wave"),
        value:
          "Dance industry actions, Body Wave, Full body wave rhythm, Full body shot showing fluidity",
      },
      {
        label: t("dance_actions.hip_point_waist"),
        value:
          "Dance industry actions, Hip Point Waist, Hip point with waist twist, Lower body close-up showing rhythm",
      },
      {
        label: t("dance_actions.hand_wave_kick"),
        value:
          "Dance industry actions, Hand Wave Kick, Hand wave with leg kick, Full body shot showing coordination",
      },
      {
        label: t("dance_actions.jump_hip"),
        value:
          "Dance industry actions, Jump Hip, Jump with hip movement, Full body shot showing energy",
      },
      {
        label: t("dance_actions.hip_push_spin"),
        value:
          "Dance industry actions, Hip Push Spin, Hip push with spin, Full body shot showing technique",
      },
      {
        label: t("dance_actions.head_turn_hand"),
        value:
          "Dance industry actions, Head Turn Hand, Head turn with hand wave, Upper body close-up showing rhythm",
      },
      {
        label: t("dance_actions.shoulder_shake_turn"),
        value:
          "Dance industry actions, Shoulder Shake Turn, Shoulder shake with turn, Full body shot showing dynamics",
      },
      {
        label: t("dance_actions.step_point_hip"),
        value:
          "Dance industry actions, Step Point Hip, Step point with hip movement, Full body shot showing rhythm",
      },
      {
        label: t("dance_actions.hand_slide_jump"),
        value:
          "Dance industry actions, Hand Slide Jump, Hand slide with jump, Full body shot showing energy",
      },
      {
        label: t("dance_actions.spin_shoulder"),
        value:
          "Dance industry actions, Spin Shoulder, Spin with shoulder drop, Full body shot showing technique",
      },
      {
        label: t("dance_actions.hip_swing_freeze"),
        value:
          "Dance industry actions, Hip Swing Freeze, Hip swing with freeze, Full body shot showing effect",
      },
      {
        label: t("dance_actions.cross_hand_wave"),
        value:
          "Dance industry actions, Cross Hand Wave, Cross step with hand wave, Full body shot showing coordination",
      },
      {
        label: t("dance_actions.hand_push_spin"),
        value:
          "Dance industry actions, Hand Push Spin, Hand push with spin, Full body shot showing fluidity",
      },
      {
        label: t("dance_actions.combination"),
        value:
          "Dance industry actions, Combination, Multiple continuous action combination, Full body shot showing overall performance",
      },
    ],
    [t]
  );

  const electricalApplianceActions = useMemo(
    () => [
      {
        label: t("electrical_appliance_actions.unbox"),
        value:
          "Small Electrical Appliance industry actions, Unbox, Product unboxing display, Close-up packaging showing texture",
      },
      {
        label: t("electrical_appliance_actions.display"),
        value:
          "Small Electrical Appliance industry actions, Display, Product appearance display, 360-degree rotation showing overall",
      },
      {
        label: t("electrical_appliance_actions.install"),
        value:
          "Small Electrical Appliance industry actions, Install, Assembly process display, Clear steps showing convenience",
      },
      {
        label: t("electrical_appliance_actions.operate"),
        value:
          "Small Electrical Appliance industry actions, Operate, Usage operation display, Button close-up showing convenience",
      },
      {
        label: t("electrical_appliance_actions.clean"),
        value:
          "Small Electrical Appliance industry actions, Clean, Cleaning process display, Disassembly process showing simplicity",
      },
      {
        label: t("electrical_appliance_actions.compare"),
        value:
          "Small Electrical Appliance industry actions, Compare, Effect comparison display, Split screen showing differences",
      },
      {
        label: t("electrical_appliance_actions.test"),
        value:
          "Small Electrical Appliance industry actions, Test, Performance testing display, Professional testing showing effect",
      },
      {
        label: t("electrical_appliance_actions.store"),
        value:
          "Small Electrical Appliance industry actions, Store, Storage method display, Space utilization showing technique",
      },
      {
        label: t("electrical_appliance_actions.adjust"),
        value:
          "Small Electrical Appliance industry actions, Adjust, Gear adjustment display, Operation close-up showing convenience",
      },
      {
        label: t("electrical_appliance_actions.disassemble"),
        value:
          "Small Electrical Appliance industry actions, Disassemble, Disassembly process display, Clear steps showing structure",
      },
      {
        label: t("electrical_appliance_actions.assemble"),
        value:
          "Small Electrical Appliance industry actions, Assemble, Assembly process display, Detailed actions showing simplicity",
      },
      {
        label: t("electrical_appliance_actions.pair"),
        value:
          "Small Electrical Appliance industry actions, Pair, Smart pairing display, Operation process showing convenience",
      },
      {
        label: t("electrical_appliance_actions.charge"),
        value:
          "Small Electrical Appliance industry actions, Charge, Charging process display, Interface close-up showing convenience",
      },
      {
        label: t("electrical_appliance_actions.cook"),
        value:
          "Small Electrical Appliance industry actions, Cook, Cooking process display, Full recording showing effect",
      },
      {
        label: t("electrical_appliance_actions.empty"),
        value:
          "Small Electrical Appliance industry actions, Empty, Waste cleaning display, Simple operation showing hygiene",
      },
      {
        label: t("electrical_appliance_actions.descale"),
        value:
          "Small Electrical Appliance industry actions, Descale, Descaling process display, Process close-up showing effect",
      },
      {
        label: t("electrical_appliance_actions.sterilize"),
        value:
          "Small Electrical Appliance industry actions, Sterilize, Sterilization function display, Function showing effect",
      },
      {
        label: t("electrical_appliance_actions.schedule"),
        value:
          "Small Electrical Appliance industry actions, Schedule, Appointment setting display, Interface showing convenience",
      },
      {
        label: t("electrical_appliance_actions.maintain"),
        value:
          "Small Electrical Appliance industry actions, Maintain, Daily maintenance display, Step showing simplicity",
      },
      {
        label: t("electrical_appliance_actions.deodorize"),
        value:
          "Small Electrical Appliance industry actions, Deodorize, Deodorization function display, Effect comparison showing function",
      },
      {
        label: t("electrical_appliance_actions.heat"),
        value:
          "Small Electrical Appliance industry actions, Heat, Heating process display, Temperature change showing efficiency",
      },
      {
        label: t("electrical_appliance_actions.cool"),
        value:
          "Small Electrical Appliance industry actions, Cool, Cooling effect display, Temperature comparison showing performance",
      },
      {
        label: t("electrical_appliance_actions.mix"),
        value:
          "Small Electrical Appliance industry actions, Mix, Mixing function display, Process showing effect",
      },
      {
        label: t("electrical_appliance_actions.grind"),
        value:
          "Small Electrical Appliance industry actions, Grind, Grinding process display, Close-up effect showing performance",
      },
      {
        label: t("electrical_appliance_actions.filter"),
        value:
          "Small Electrical Appliance industry actions, Filter, Filtering effect display, Comparison showing effect",
      },
      {
        label: t("electrical_appliance_actions.steam"),
        value:
          "Small Electrical Appliance industry actions, Steam, Steam effect display, Special effect showing function",
      },
      {
        label: t("electrical_appliance_actions.sanitize"),
        value:
          "Small Electrical Appliance industry actions, Sanitize, Sanitization function display, Professional test showing effect",
      },
      {
        label: t("electrical_appliance_actions.keep_warm"),
        value:
          "Small Electrical Appliance industry actions, Keep Warm, Heat preservation effect display, Time comparison showing performance",
      },
      {
        label: t("electrical_appliance_actions.anti_overflow"),
        value:
          "Small Electrical Appliance industry actions, Anti-overflow, Anti-overflow function display, Test showing performance",
      },
      {
        label: t("electrical_appliance_actions.self_clean"),
        value:
          "Small Electrical Appliance industry actions, Self-clean, Self-cleaning display, Function showing convenience",
      },
      {
        label: t("electrical_appliance_actions.defrost"),
        value:
          "Small Electrical Appliance industry actions, Defrost, Defrosting function display, Effect showing performance",
      },
      {
        label: t("electrical_appliance_actions.dehumidify"),
        value:
          "Small Electrical Appliance industry actions, Dehumidify, Dehumidification function display, Effect comparison showing performance",
      },
      {
        label: t("electrical_appliance_actions.humidify"),
        value:
          "Small Electrical Appliance industry actions, Humidify, Humidification effect display, Data showing effect",
      },
      {
        label: t("electrical_appliance_actions.dust_remove"),
        value:
          "Small Electrical Appliance industry actions, Dust Remove, Dust removal process display, Effect comparison showing performance",
      },
      {
        label: t("electrical_appliance_actions.silent_mode"),
        value:
          "Small Electrical Appliance industry actions, Silent Mode, Silent effect display, Decibel test showing performance",
      },
      {
        label: t("electrical_appliance_actions.timer"),
        value:
          "Small Electrical Appliance industry actions, Timer, Timer function display, Setting showing convenience",
      },
      {
        label: t("electrical_appliance_actions.temperature"),
        value:
          "Small Electrical Appliance industry actions, Temperature, Temperature measurement display, Data showing accuracy",
      },
      {
        label: t("electrical_appliance_actions.energy_save"),
        value:
          "Small Electrical Appliance industry actions, Energy Save, Energy-saving mode display, Data comparison showing power saving",
      },
      {
        label: t("electrical_appliance_actions.voice_control"),
        value:
          "Small Electrical Appliance industry actions, Voice Control, Voice control display, Operation demonstration showing intelligence",
      },
      {
        label: t("electrical_appliance_actions.filter_change"),
        value:
          "Small Electrical Appliance industry actions, Filter Change, Filter replacement display, Steps showing simplicity",
      },
      {
        label: t("electrical_appliance_actions.mite_remove"),
        value:
          "Small Electrical Appliance industry actions, Mite Remove, Mite removal effect display, Professional inspection showing effect",
      },
      {
        label: t("electrical_appliance_actions.anti_scald"),
        value:
          "Small Electrical Appliance industry actions, Anti-scald, Anti-scald function display, Safety test showing protection",
      },
      {
        label: t("electrical_appliance_actions.monitor"),
        value:
          "Small Electrical Appliance industry actions, Monitor, Monitoring function display, Data showing accuracy",
      },
      {
        label: t("electrical_appliance_actions.leak_proof"),
        value:
          "Small Electrical Appliance industry actions, Leak-proof, Leak-proof function display, Test showing safety",
      },
      {
        label: t("electrical_appliance_actions.power_off"),
        value:
          "Small Electrical Appliance industry actions, Power Off, Power-off protection display, Safety test showing protection",
      },
      {
        label: t("electrical_appliance_actions.defog"),
        value:
          "Small Electrical Appliance industry actions, Defog, Defog function display, Effect comparison showing performance",
      },
      {
        label: t("electrical_appliance_actions.fresh_keep"),
        value:
          "Small Electrical Appliance industry actions, Fresh Keep, Freshness preservation display, Comparison showing effect",
      },
    ],
    [t]
  );

  const shoeActions = useMemo(
    () => [
      {
        label: t("shoe_actions.display"),
        value:
          "Shoe industry actions, Display, Elegant shoe display, 360-degree rotation showing overall",
      },
      {
        label: t("shoe_actions.try_on"),
        value:
          "Shoe industry actions, Try On, Try-on process display, Full process showing convenience",
      },
      {
        label: t("shoe_actions.match"),
        value:
          "Shoe industry actions, Match, Outfit matching display, Full body shot showing coordination",
      },
      {
        label: t("shoe_actions.walk"),
        value:
          "Shoe industry actions, Walk, Walking effect display, Following shot showing texture",
      },
      {
        label: t("shoe_actions.run"),
        value:
          "Shoe industry actions, Run, Running state display, Dynamic shot showing function",
      },
      {
        label: t("shoe_actions.clean"),
        value:
          "Shoe industry actions, Clean, Cleaning maintenance process, Detail close-up showing method",
      },
      {
        label: t("shoe_actions.compare"),
        value:
          "Shoe industry actions, Compare, New-old comparison display, Side-by-side showing effect",
      },
      {
        label: t("shoe_actions.store"),
        value:
          "Shoe industry actions, Store, Storage organization method, Space utilization showing technique",
      },
      {
        label: t("shoe_actions.lace"),
        value:
          "Shoe industry actions, Lace, Lacing method display, Hand close-up showing technique",
      },
      {
        label: t("shoe_actions.fold"),
        value:
          "Shoe industry actions, Fold, Foldable design display, Full process showing feature",
      },
      {
        label: t("shoe_actions.test"),
        value:
          "Shoe industry actions, Test, Functionality testing, Professional test showing performance",
      },
      {
        label: t("shoe_actions.spray"),
        value:
          "Shoe industry actions, Spray, Protection spray process, Process close-up showing effect",
      },
      {
        label: t("shoe_actions.wipe"),
        value:
          "Shoe industry actions, Wipe, Daily maintenance display, Detail action showing method",
      },
      {
        label: t("shoe_actions.change_insole"),
        value:
          "Shoe industry actions, Change Insole, Insole replacement process, Action close-up showing simplicity",
      },
      {
        label: t("shoe_actions.waterproof"),
        value:
          "Shoe industry actions, Waterproof, Waterproof effect display, Experiment showing function",
      },
      {
        label: t("shoe_actions.repair"),
        value:
          "Shoe industry actions, Repair, Damage repair process, Process close-up showing technique",
      },
      {
        label: t("shoe_actions.renovate"),
        value:
          "Shoe industry actions, Renovate, Renovation process display, Before-after showing effect",
      },
      {
        label: t("shoe_actions.adjust"),
        value:
          "Shoe industry actions, Adjust, Comfort adjustment, Detail showing method",
      },
      {
        label: t("shoe_actions.shape"),
        value:
          "Shoe industry actions, Shape, Shape protection display, Process showing method",
      },
      {
        label: t("shoe_actions.dry"),
        value:
          "Shoe industry actions, Dry, Drying process display, Correct method showing technique",
      },
      {
        label: t("shoe_actions.polish"),
        value:
          "Shoe industry actions, Polish, Leather shoe polishing display, Detail close-up showing technique",
      },
      {
        label: t("shoe_actions.color_repair"),
        value:
          "Shoe industry actions, Color Repair, Color restoration display, Process close-up showing effect",
      },
      {
        label: t("shoe_actions.anti_slip"),
        value:
          "Shoe industry actions, Anti-slip, Anti-slip treatment display, Effect test showing function",
      },
      {
        label: t("shoe_actions.anti_wear"),
        value:
          "Shoe industry actions, Anti-wear, Anti-wear application, Usage method showing effect",
      },
      {
        label: t("shoe_actions.stretch"),
        value:
          "Shoe industry actions, Stretch, Shoe stretching display, Process showing method",
      },
      {
        label: t("shoe_actions.smooth"),
        value:
          "Shoe industry actions, Smooth, Wrinkle treatment display, Process close-up showing effect",
      },
      {
        label: t("shoe_actions.soften"),
        value:
          "Shoe industry actions, Soften, Hardness softening treatment, Treatment method showing effect",
      },
      {
        label: t("shoe_actions.protect"),
        value:
          "Shoe industry actions, Protect, Protection measure display, Usage method showing effect",
      },
      {
        label: t("shoe_actions.trim"),
        value:
          "Shoe industry actions, Trim, Edge repair display, Process close-up showing technique",
      },
      {
        label: t("shoe_actions.repair_damage"),
        value:
          "Shoe industry actions, Repair Damage, Damage repair display, Repair process showing effect",
      },
      {
        label: t("shoe_actions.color_match"),
        value:
          "Shoe industry actions, Color Match, Color matching display, Overall showing coordination",
      },
      {
        label: t("shoe_actions.anti_fold"),
        value:
          "Shoe industry actions, Anti-fold, Crease prevention treatment, Protection method showing effect",
      },
      {
        label: t("shoe_actions.stain_remove"),
        value:
          "Shoe industry actions, Stain Remove, Stain cleaning display, Cleaning process showing effect",
      },
      {
        label: t("shoe_actions.edge_wrap"),
        value:
          "Shoe industry actions, Edge Wrap, Edge protection display, Usage method showing effect",
      },
      {
        label: t("shoe_actions.fix"),
        value:
          "Shoe industry actions, Fix, Loose repair display, Repair process showing method",
      },
      {
        label: t("shoe_actions.sole_paste"),
        value:
          "Shoe industry actions, Sole Paste, Sole repair display, Repair process showing technique",
      },
      {
        label: t("shoe_actions.moisture_proof"),
        value:
          "Shoe industry actions, Moisture-proof, Moisture prevention display, Treatment method showing effect",
      },
      {
        label: t("shoe_actions.ventilate"),
        value:
          "Shoe industry actions, Ventilate, Ventilation treatment display, Function showing effect",
      },
      {
        label: t("shoe_actions.anti_press"),
        value:
          "Shoe industry actions, Anti-press, Pressure mark prevention, Protection method showing effect",
      },
      {
        label: t("shoe_actions.color_change"),
        value:
          "Shoe industry actions, Color Change, Color changing process, Full process showing effect",
      },
      {
        label: t("shoe_actions.wax"),
        value:
          "Shoe industry actions, Wax, Shoe waxing display, Detail showing technique",
      },
      {
        label: t("shoe_actions.deodorize"),
        value:
          "Shoe industry actions, Deodorize, Deodorization treatment display, Treatment method showing effect",
      },
      {
        label: t("shoe_actions.patch"),
        value:
          "Shoe industry actions, Patch, Hole repair display, Repair process showing technique",
      },
      {
        label: t("shoe_actions.wash"),
        value:
          "Shoe industry actions, Wash, Deep cleaning display, Cleaning process showing method",
      },
      {
        label: t("shoe_actions.disinfect"),
        value:
          "Shoe industry actions, Disinfect, Disinfection treatment display, Treatment method showing effect",
      },
      {
        label: t("shoe_actions.sun_protection"),
        value:
          "Shoe industry actions, Sun Protection, Sun protection display, Protection method showing effect",
      },
      {
        label: t("shoe_actions.dust_remove"),
        value:
          "Shoe industry actions, Dust Remove, Dust cleaning display, Cleaning method showing effect",
      },
      {
        label: t("shoe_actions.care"),
        value:
          "Shoe industry actions, Care, Daily care display, Care method showing effect",
      },
      {
        label: t("shoe_actions.storage"),
        value:
          "Shoe industry actions, Storage, Storage display, Storage method showing technique",
      },
    ],
    [t]
  );

  const reviewActions = useMemo(
    () => [
      {
        label: t("review_actions.display"),
        value:
          "Product Recommendation industry actions, Display, Elegant product display, 360-degree rotation highlighting details",
      },
      {
        label: t("review_actions.review"),
        value:
          "Product Recommendation industry actions, Review, Professional product evaluation, Feature close-up showing comparison",
      },
      {
        label: t("review_actions.try_on"),
        value:
          "Product Recommendation industry actions, Try On, Actual usage display, Real use highlighting experience",
      },
      {
        label: t("review_actions.compare"),
        value:
          "Product Recommendation industry actions, Compare, Before-after comparison display, Split screen showing changes",
      },
      {
        label: t("review_actions.unbox"),
        value:
          "Product Recommendation industry actions, Unbox, Unboxing process display, Complete process showing texture",
      },
      {
        label: t("review_actions.base_test"),
        value:
          "Product Recommendation industry actions, Base Test, Basic testing display, Detail recording showing professional judgment",
      },
      {
        label: t("review_actions.experience"),
        value:
          "Product Recommendation industry actions, Experience, Usage experience display, Real feedback showing emotion",
      },
      {
        label: t("review_actions.lighting"),
        value:
          "Product Recommendation industry actions, Lighting, Product lighting display, Light close-up showing texture",
      },
      {
        label: t("review_actions.touch"),
        value:
          "Product Recommendation industry actions, Touch, Texture touch display, Hand close-up showing feel",
      },
      {
        label: t("review_actions.disassemble"),
        value:
          "Product Recommendation industry actions, Disassemble, Product disassembly display, Clear steps showing details",
      },
      {
        label: t("review_actions.match"),
        value:
          "Product Recommendation industry actions, Match, Matching display effect, Overall coordination showing combination",
      },
      {
        label: t("review_actions.compare_size"),
        value:
          "Product Recommendation industry actions, Compare Size, Size comparison display, Physical comparison showing intuition",
      },
      {
        label: t("review_actions.close_up"),
        value:
          "Product Recommendation industry actions, Close-up, Detail close-up display, Macro shooting showing details",
      },
      {
        label: t("review_actions.describe"),
        value:
          "Product Recommendation industry actions, Describe, Verbal explanation display, Professional narration highlighting key points",
      },
      {
        label: t("review_actions.recommend"),
        value:
          "Product Recommendation industry actions, Recommend, Recommendation reason display, Clear logic highlighting key points",
      },
      {
        label: t("review_actions.real_test"),
        value:
          "Product Recommendation industry actions, Real Test, Actual testing display, Real test with data support",
      },
      {
        label: t("review_actions.cross_review"),
        value:
          "Product Recommendation industry actions, Cross Review, Horizontal comparison review, Multi-product comparison showing professional analysis",
      },
      {
        label: t("review_actions.reveal"),
        value:
          "Product Recommendation industry actions, Reveal, Product reveal display, Step display showing highlights",
      },
      {
        label: t("review_actions.store_visit"),
        value:
          "Product Recommendation industry actions, Store Visit, Physical store visit display, Real scene showing experience",
      },
      {
        label: t("review_actions.brief_review"),
        value:
          "Product Recommendation industry actions, Brief Review, Brief comment display, Key points showing conciseness",
      },
      {
        label: t("review_actions.first_try"),
        value:
          "Product Recommendation industry actions, First Try, First use display, Real reaction showing intuition",
      },
      {
        label: t("review_actions.detail_test"),
        value:
          "Product Recommendation industry actions, Detail Test, Detailed testing display, Comprehensive test showing detailed data",
      },
      {
        label: t("review_actions.share"),
        value:
          "Product Recommendation industry actions, Share, Usage sharing display, Personal experience showing authenticity",
      },
      {
        label: t("review_actions.comment"),
        value:
          "Product Recommendation industry actions, Comment, Professional comment display, Professional viewpoint showing analysis",
      },
      {
        label: t("review_actions.analyze"),
        value:
          "Product Recommendation industry actions, Analyze, Product analysis display, Clear logic showing professional interpretation",
      },
      {
        label: t("review_actions.quick_review"),
        value:
          "Product Recommendation industry actions, Quick Review, Quick evaluation display, Key points showing conciseness",
      },
      {
        label: t("review_actions.preview"),
        value:
          "Product Recommendation industry actions, Preview, New product preview display, First-hand showing timeliness",
      },
      {
        label: t("review_actions.explore"),
        value:
          "Product Recommendation industry actions, Explore, In-depth exploration display, Professional perspective showing depth",
      },
      {
        label: t("review_actions.explain"),
        value:
          "Product Recommendation industry actions, Explain, Detailed explanation display, Clear key points showing comprehension",
      },
      {
        label: t("review_actions.usage_tips"),
        value:
          "Product Recommendation industry actions, Usage Tips, Usage tips display, Practical tips showing innovation",
      },
      {
        label: t("review_actions.note"),
        value:
          "Product Recommendation industry actions, Note, Key note display, Key information showing clarity",
      },
      {
        label: t("review_actions.guide"),
        value:
          "Product Recommendation industry actions, Guide, Usage guide display, Practical guide showing clear steps",
      },
      {
        label: t("review_actions.predict"),
        value:
          "Product Recommendation industry actions, Predict, Product prediction display, Professional analysis showing rational prediction",
      },
      {
        label: t("review_actions.rate"),
        value:
          "Product Recommendation industry actions, Rate, Rating system display, Clear standards showing fair evaluation",
      },
      {
        label: t("review_actions.experiment"),
        value:
          "Product Recommendation industry actions, Experiment, Experiment process display, Scientific verification showing data support",
      },
      {
        label: t("review_actions.identify"),
        value:
          "Product Recommendation industry actions, Identify, Authenticity identification display, Professional knowledge showing key points",
      },
      {
        label: t("review_actions.educate"),
        value:
          "Product Recommendation industry actions, Educate, Knowledge education display, Professional knowledge showing comprehension",
      },
      {
        label: t("review_actions.analysis"),
        value:
          "Product Recommendation industry actions, Analysis, In-depth analysis display, Rigorous logic showing professional analysis",
      },
      {
        label: t("review_actions.purchase_guide"),
        value:
          "Product Recommendation industry actions, Purchase Guide, Purchase guide display, Professional advice showing rational choice",
      },
      {
        label: t("review_actions.correct"),
        value:
          "Product Recommendation industry actions, Correct, Misconception correction display, Common mistakes showing correct guidance",
      },
      {
        label: t("review_actions.verify"),
        value:
          "Product Recommendation industry actions, Verify, Real verification display, Actual test showing data support",
      },
      {
        label: t("review_actions.research"),
        value:
          "Product Recommendation industry actions, Research, Market research display, Detailed data showing market analysis",
      },
      {
        label: t("review_actions.tour"),
        value:
          "Product Recommendation industry actions, Tour, Product tour display, Comprehensive showing systematic introduction",
      },
      {
        label: t("review_actions.discovery"),
        value:
          "Product Recommendation industry actions, Discovery, Product discovery display, Unique perspective showing depth",
      },
      {
        label: t("review_actions.deduce"),
        value:
          "Product Recommendation industry actions, Deduce, Principle deduction display, Clear logic showing principle analysis",
      },
      {
        label: t("review_actions.summarize"),
        value:
          "Product Recommendation industry actions, Summarize, Experience summary display, Key points showing experience sharing",
      },
      {
        label: t("review_actions.demonstrate"),
        value:
          "Product Recommendation industry actions, Demonstrate, Usage demonstration display, Standard operation showing clarity",
      },
      {
        label: t("review_actions.review_test"),
        value:
          "Product Recommendation industry actions, Review Test, Review reading display, Detailed reading showing deep understanding",
      },
      {
        label: t("review_actions.qa"),
        value:
          "Product Recommendation industry actions, Q&A, Question answer display, Common questions showing professional answers",
      },
    ],
    [t]
  );

  const jewelryActions = useMemo(
    () => [
      {
        label: t("jewelry_actions.display"),
        value:
          "Jewelry industry actions, Display, Elegant jewelry display, Slow rotation showing luster",
      },
      {
        label: t("jewelry_actions.wear"),
        value:
          "Jewelry industry actions, Wear, Jewelry wearing process, Elegant movement showing convenience",
      },
      {
        label: t("jewelry_actions.rotate"),
        value:
          "Jewelry industry actions, Rotate, 360-degree all-around display, Stable rotation capturing light and shadow",
      },
      {
        label: t("jewelry_actions.play"),
        value:
          "Jewelry industry actions, Play, Hand-held jewelry play, Highlighting texture showing quality",
      },
      {
        label: t("jewelry_actions.compare"),
        value:
          "Jewelry industry actions, Compare, Size comparison display, Clear comparison showing features",
      },
      {
        label: t("jewelry_actions.match"),
        value:
          "Jewelry industry actions, Match, Outfit matching display, Overall coordination showing temperament",
      },
      {
        label: t("jewelry_actions.touch"),
        value:
          "Jewelry industry actions, Touch, Gentle touch display, Elegant hand movement showing texture",
      },
      {
        label: t("jewelry_actions.reflect"),
        value:
          "Jewelry industry actions, Reflect, Light refraction effect, Capturing light showing brilliance",
      },
      {
        label: t("jewelry_actions.stack"),
        value:
          "Jewelry industry actions, Stack, Multiple pieces wearing combination, Clear layers showing matching",
      },
      {
        label: t("jewelry_actions.contrast"),
        value:
          "Jewelry industry actions, Contrast, Jewelry and skin tone contrast, Clean skin tone showing harmony",
      },
      {
        label: t("jewelry_actions.polish"),
        value:
          "Jewelry industry actions, Polish, Polishing effect display, Close-up shot showing luster",
      },
      {
        label: t("jewelry_actions.measure"),
        value:
          "Jewelry industry actions, Measure, Size measurement display, Accurate professional showing specifications",
      },
      {
        label: t("jewelry_actions.customize"),
        value:
          "Jewelry industry actions, Customize, Customization process display, Highlighting professionalism showing craftsmanship",
      },
      {
        label: t("jewelry_actions.appreciate"),
        value:
          "Jewelry industry actions, Appreciate, Professional appreciation process, Highlighting details showing professional explanation",
      },
      {
        label: t("jewelry_actions.select"),
        value:
          "Jewelry industry actions, Select, Jewelry selection process, Professional advice showing key points",
      },
      {
        label: t("jewelry_actions.place"),
        value:
          "Jewelry industry actions, Place, Display arrangement effect, Beautiful composition showing layers",
      },
      {
        label: t("jewelry_actions.combine"),
        value:
          "Jewelry industry actions, Combine, Multiple pieces combination display, Harmonious matching showing overall",
      },
      {
        label: t("jewelry_actions.describe"),
        value:
          "Jewelry industry actions, Describe, Jewelry feature explanation, Professional terms showing key points",
      },
      {
        label: t("jewelry_actions.sketch"),
        value:
          "Jewelry industry actions, Sketch, Design drawing, Showing creativity highlighting professionalism",
      },
      {
        label: t("jewelry_actions.carve"),
        value:
          "Jewelry industry actions, Carve, Carving craftsmanship display, Detail close-up showing skill",
      },
      {
        label: t("jewelry_actions.maintain"),
        value:
          "Jewelry industry actions, Maintain, Maintenance method display, Professional technique showing practical tips",
      },
      {
        label: t("jewelry_actions.clean"),
        value:
          "Jewelry industry actions, Clean, Cleaning process display, Professional tools showing standard process",
      },
      {
        label: t("jewelry_actions.shape"),
        value:
          "Jewelry industry actions, Shape, Ring shaping display, Professional tools showing process",
      },
      {
        label: t("jewelry_actions.inlay"),
        value:
          "Jewelry industry actions, Inlay, Inlay craftsmanship display, Detail close-up showing technique",
      },
      {
        label: t("jewelry_actions.grade"),
        value:
          "Jewelry industry actions, Grade, Quality grade display, Professional evaluation showing clear comparison",
      },
      {
        label: t("jewelry_actions.try_on"),
        value:
          "Jewelry industry actions, Try On, Wearing effect display, Multiple angles showing effect",
      },
      {
        label: t("jewelry_actions.accessorize"),
        value:
          "Jewelry industry actions, Accessorize, Matching skills display, Overall coordination showing taste",
      },
      {
        label: t("jewelry_actions.collect"),
        value:
          "Jewelry industry actions, Collect, Collection method display, Professional storage showing reasonable maintenance",
      },
      {
        label: t("jewelry_actions.box"),
        value:
          "Jewelry industry actions, Box, Packaging display process, Exquisite packaging showing quality",
      },
      {
        label: t("jewelry_actions.color_check"),
        value:
          "Jewelry industry actions, Color Check, Gemstone color display, Accurate color showing professional grading",
      },
      {
        label: t("jewelry_actions.enhance"),
        value:
          "Jewelry industry actions, Enhance, Wearing effect enhancement, Before-after comparison showing change",
      },
      {
        label: t("jewelry_actions.adjust"),
        value:
          "Jewelry industry actions, Adjust, Size adjustment display, Professional tools showing standard operation",
      },
      {
        label: t("jewelry_actions.project"),
        value:
          "Jewelry industry actions, Project, Light projection effect, Capturing light showing quality",
      },
      {
        label: t("jewelry_actions.repair"),
        value:
          "Jewelry industry actions, Repair, Repair process display, Professional technique showing details",
      },
      {
        label: t("jewelry_actions.redesign"),
        value:
          "Jewelry industry actions, Redesign, Redesign process display, Creative design showing change",
      },
      {
        label: t("jewelry_actions.clasp"),
        value:
          "Jewelry industry actions, Clasp, Clasp usage display, Operation details showing instructions",
      },
      {
        label: t("jewelry_actions.accent"),
        value:
          "Jewelry industry actions, Accent, Decoration effect display, Detail close-up showing highlights",
      },
      {
        label: t("jewelry_actions.change_chain"),
        value:
          "Jewelry industry actions, Change Chain, Chain replacement display, Professional tools showing standard operation",
      },
      {
        label: t("jewelry_actions.examine"),
        value:
          "Jewelry industry actions, Examine, Professional inspection display, Equipment usage showing professional explanation",
      },
      {
        label: t("jewelry_actions.chain_match"),
        value:
          "Jewelry industry actions, Chain Match, Chain matching display, Style matching showing coordination",
      },
      {
        label: t("jewelry_actions.edge"),
        value:
          "Jewelry industry actions, Edge, Edge craftsmanship display, Craft details showing technique",
      },
      {
        label: t("jewelry_actions.solder"),
        value:
          "Jewelry industry actions, Solder, Soldering process display, Technical showing professionalism",
      },
      {
        label: t("jewelry_actions.burnish"),
        value:
          "Jewelry industry actions, Burnish, Polishing and burnishing display, Process showing effect",
      },
      {
        label: t("jewelry_actions.setting"),
        value:
          "Jewelry industry actions, Setting, Setting craftsmanship display, Detail close-up showing technique",
      },
      {
        label: t("jewelry_actions.calibrate"),
        value:
          "Jewelry industry actions, Calibrate, Size calibration display, Professional measurement showing precise adjustment",
      },
      {
        label: t("jewelry_actions.pearl_match"),
        value:
          "Jewelry industry actions, Pearl Match, Pearl matching display, Color comparison showing size matching",
      },
      {
        label: t("jewelry_actions.seal"),
        value:
          "Jewelry industry actions, Seal, Protection treatment display, Professional tools showing standard operation",
      },
    ],
    [t]
  );

  const industries = useMemo(
    () => [
      {
        label: t("industries.mukbang"),
        value: "Mukbang Industry",
        actions: mukbangActions,
      },
      {
        label: t("industries.pet"),
        value: "Pet Industry",
        actions: petActions,
      },
      {
        label: t("industries.clothing"),
        value: "Clothing Industry",
        actions: clothingActions,
      },
      {
        label: t("industries.advertising"),
        value: "Advertising Industry",
        actions: advertisingActions,
      },
      {
        label: t("industries.cosmetics"),
        value: "Cosmetics Industry",
        actions: cosmeticsActions,
      },
      {
        label: t("industries.maternal_infant"),
        value: "Maternal and Infant Industry",
        actions: maternalInfantActions,
      },
      {
        label: t("industries.watch"),
        value: "Watch Industry",
        actions: watchActions,
      },
      {
        label: t("industries.dance"),
        value: "Dance Industry",
        actions: danceActions,
      },
      {
        label: t("industries.electrical_appliance"),
        value: "Small Electrical Appliance Industry",
        actions: electricalApplianceActions,
      },
      {
        label: t("industries.shoe"),
        value: "Shoe Industry",
        actions: shoeActions,
      },
      {
        label: t("industries.review"),
        value: "Product Recommendation Industry",
        actions: reviewActions,
      },
      {
        label: t("industries.jewelry"),
        value: "Jewelry Industry",
        actions: jewelryActions,
      },
    ],
    [
      advertisingActions,
      clothingActions,
      cosmeticsActions,
      danceActions,
      watchActions,
      electricalApplianceActions,
      jewelryActions,
      maternalInfantActions,
      mukbangActions,
      petActions,
      reviewActions,
      shoeActions,
      t,
    ]
  );

  const restrictiveWords = useMemo(
    () => [
      {
        label: t("restrictive_words.blurry"),
        value: "Improve clarity, Avoid unclear images",
      },
      {
        label: t("restrictive_words.low_resolution"),
        value: "Set high resolution, Avoid poor pixel sensitivity",
      },
      {
        label: t("restrictive_words.tearing"),
        value: "Increase frame rate, Avoid screen breakage",
      },
      {
        label: t("restrictive_words.color_distortion"),
        value: "Calibrate colors, Avoid color anomalies",
      },
      {
        label: t("restrictive_words.noise"),
        value: "Reduce noise, Avoid image noise",
      },
      {
        label: t("restrictive_words.overexposed"),
        value: "Control exposure, Avoid overbrightness",
      },
      {
        label: t("restrictive_words.dark_blacks"),
        value: "Enhance shadows, Avoid detail loss",
      },
      {
        label: t("restrictive_words.ghosting"),
        value: "Increase speed, Avoid motion blur",
      },
      {
        label: t("restrictive_words.deformed"),
        value: "Optimize skeleton, Avoid character deformation",
      },
      {
        label: t("restrictive_words.face_distortion"),
        value: "Face correction, Avoid strange expressions",
      },
      {
        label: t("restrictive_words.no_texture"),
        value: "Add details, Avoid flat appearance",
      },
      {
        label: t("restrictive_words.frame_skip"),
        value: "Increase frame rate, Avoid discontinuity",
      },
      {
        label: t("restrictive_words.shaking"),
        value: "Anti-shake processing, Avoid instability",
      },
      {
        label: t("restrictive_words.color_bleeding"),
        value: "Control color, Avoid edge color leakage",
      },
      {
        label: t("restrictive_words.jagged_edges"),
        value: "Anti-aliasing, Avoid rough edges",
      },
      {
        label: t("restrictive_words.bad_skin"),
        value: "Optimize material, Avoid unrealistic skin",
      },
      {
        label: t("restrictive_words.eye_deform"),
        value: "Detail optimization, Avoid strange eyes",
      },
      {
        label: t("restrictive_words.stiff_hair"),
        value: "Add dynamics, Avoid unnatural movement",
      },
      {
        label: t("restrictive_words.rigid_cloth"),
        value: "Material optimization, Avoid unrealistic texture",
      },
      {
        label: t("restrictive_words.bad_lighting"),
        value: "Adjust lighting, Avoid strange light effects",
      },
      {
        label: t("restrictive_words.robotic_motion"),
        value: "Natural transition, Avoid stiff movement",
      },
      {
        label: t("restrictive_words.empty_scene"),
        value: "Enrich details, Avoid monotonous scene",
      },
      {
        label: t("restrictive_words.bad_perspective"),
        value: "Correct perspective, Avoid poor spatial sense",
      },
      {
        label: t("restrictive_words.flat_texture"),
        value: "Add details, Avoid lack of texture",
      },
      {
        label: t("restrictive_words.over_reflection"),
        value: "Control intensity, Avoid glaring reflections",
      },
      {
        label: t("restrictive_words.hard_shadow"),
        value: "Soften edges, Avoid harsh shadows",
      },
      {
        label: t("restrictive_words.monotone"),
        value: "Enrich colors, Avoid lack of layers",
      },
      {
        label: t("restrictive_words.bad_dof"),
        value: "Adjust focus, Avoid strange blur",
      },
      {
        label: t("restrictive_words.bad_composition"),
        value: "Optimize layout, Avoid messy composition",
      },
      {
        label: t("restrictive_words.bad_effect"),
        value: "Improve quality, Avoid rough effects",
      },
      {
        label: t("restrictive_words.hard_cut"),
        value: "Smooth transition, Avoid abrupt cuts",
      },
      {
        label: t("restrictive_words.stiff_animation"),
        value: "Smooth transition, Avoid discontinuity",
      },
      {
        label: t("restrictive_words.render_noise"),
        value: "Improve sampling, Avoid graininess",
      },
      {
        label: t("restrictive_words.model_jaggies"),
        value: "Improve precision, Avoid rough edges",
      },
      {
        label: t("restrictive_words.repeat_texture"),
        value: "Break up texture, Avoid obvious repetition",
      },
      {
        label: t("restrictive_words.lens_flare"),
        value: "Control intensity, Avoid excessive glare",
      },
      {
        label: t("restrictive_words.mosaic"),
        value: "Improve precision, Avoid pixelation",
      },
      {
        label: t("restrictive_words.washed_out"),
        value: "Enhance saturation, Avoid faded look",
      },
      {
        label: t("restrictive_words.compression"),
        value: "Improve bitrate, Avoid quality loss",
      },
      {
        label: t("restrictive_words.green_edge"),
        value: "Color correction, Avoid color bias",
      },
      {
        label: t("restrictive_words.motion_delay"),
        value: "Optimize timing, Avoid desynchronization",
      },
      {
        label: t("restrictive_words.texture_flash"),
        value: "Stabilize display, Avoid flickering",
      },
      {
        label: t("restrictive_words.shadow_leak"),
        value: "Light blocking, Avoid light leakage",
      },
      {
        label: t("restrictive_words.clipping"),
        value: "Collision detection, Avoid interpenetration",
      },
      {
        label: t("restrictive_words.color_break"),
        value: "Smooth transition, Avoid color banding",
      },
      {
        label: t("restrictive_words.screen_tear"),
        value: "Vertical sync, Avoid screen tearing",
      },
      {
        label: t("restrictive_words.texture_break"),
        value: "Smooth processing, Avoid texture jumping",
      },
      {
        label: t("restrictive_words.motion_stuck"),
        value: "Improve performance, Avoid stuttering",
      },
      {
        label: t("restrictive_words.texture_blur"),
        value: "Enhance clarity, Avoid detail loss",
      },
      {
        label: t("restrictive_words.empty_background"),
        value: "Enrich background, Avoid monotony",
      },
    ],
    [t]
  );

  return {
    ...useVideoModeFormHook,
    isCreating,
    handleProcessTask,
    cameraLanguages,
    expressions,
    emotions,
    industries,
    restrictiveWords,
  };
}
